const { ChatAlibabaTongyi } = require("@langchain/community/chat_models/alibaba_tongyi");
const { HumanMessage } = require("@langchain/core/messages");

// 配置环境变量
require("dotenv").config();

const input = "Hello, world";
const llm = new ChatAlibabaTongyi({
    model: "qwen-turbo", // Available models: qwen-turbo, qwen-plus, qwen-max
    alibabaApiKey: process.env.ALIBABA_API_KEY
});

const message = [new HumanMessage(input)];

// 定义一个异步函数来调用模型
(async () => {
    try {
        // 调用 tongyi 模型
        const response = await llm.invoke(message);
        // 打印大模型的返回结果
        console.log('Response from the model:', response.content);
    } catch (error) {
        // 错误处理
        console.error("Error:", error);
    }
})();