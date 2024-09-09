const express = require('express')
const cors = require('cors')
const tongyiController = require('./tongyi.controller')
const ragController = require('./rag.controller')

const app = express()
app.use(cors())
// app.use(bodyParser.json())
app.use(express.json()); 

// app.post('/chatbot', chatGptController.askToChatGpt)
app.post('/chat', tongyiController.ask)

app.post('/rag/query', ragController.query)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
