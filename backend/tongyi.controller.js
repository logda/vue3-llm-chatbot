// 引入必要的模块
const { ChatAlibabaTongyi } = require("@langchain/community/chat_models/alibaba_tongyi");
const { HumanMessage } = require("@langchain/core/messages");


// 配置环境变量
require("dotenv").config();

const llm = new ChatAlibabaTongyi({
    model: "qwen-turbo",
    alibabaApiKey: process.env.ALIBABA_API_KEY
})
// 创建一个函数来调用 tongyiqianwen 接口
const ask = async function (req, res) {

    try {
        console.log('Request body:', req.body);
        if (!req.body || !req.body.message) {
            return res.status(400).json({ error: 'Missing required field: message' });
        }
        console.log('Request body:', req.body);
        console.log('===message: ' + req.body.message);
        const message = [new HumanMessage(req.body.message )];
        const response = await llm.invoke(message);

        // 将响应发送回客户端
        res.json({ response: response });
    } catch (error) {
        // 错误处理
        console.error("Error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


module.exports = {
    ask
};

