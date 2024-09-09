require("dotenv").config();

const { ChatAlibabaTongyi } = require("@langchain/community/chat_models/alibaba_tongyi");
const { HumanMessage } = require("@langchain/core/messages");
const { AlibabaTongyiEmbeddings } = require("@langchain/community/embeddings/alibaba_tongyi");
const { CheerioWebBaseLoader } = require("@langchain/community/document_loaders/web/cheerio");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");


const llm = new ChatAlibabaTongyi({
    model: "qwen-turbo",
    alibabaApiKey: process.env.ALIBABA_API_KEY
})

const loader = new CheerioWebBaseLoader(
    "https://lilianweng.github.io/posts/2023-06-23-agent/"
);
let vectorStore = null;

const query = async function (req, res) {
    try {
        console.log('Request body:', req.body);
        if (!req.body || !req.body.prompt) {
            return res.status(400).json({ error: 'Missing required field: message' });
        }
        const question = req.body.prompt;
        if (!vectorStore) {
            const docs = await loader.load();
            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
            const splits = await textSplitter.splitDocuments(docs);
            vectorStore = await MemoryVectorStore.fromDocuments(
                splits,
                new AlibabaTongyiEmbeddings({})
            );
        }

        const retriever = vectorStore.asRetriever();
        const retrievedDocs = await retriever.invoke(question);

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", `Answer the user's questions based on the below context. If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know": <context>{context}</context>`],
            new MessagesPlaceholder("question"),
        ]);

        const ragChain = await createStuffDocumentsChain({
            llm,
            prompt
        });

        const ans = await ragChain.invoke({
            question: [new HumanMessage(question)],
            context: retrievedDocs,
        });

        res.json({ answer: ans });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    query
};