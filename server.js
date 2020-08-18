const express = require('express')
const path = require('path')
require('./db/mongoose')
const bodyParser = require('body-parser')
const Message = require('./models/message')
const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

const frontEndPath = path.join(__dirname,'./front-end')

app.use(express.static(frontEndPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/messages',async (req,res)=>{
    try{
        const messges = await Message.find({})
        res.status(200).send(messages)

    }catch(e){
        res.status(500)
    }
    
})

app.post('/messages',async (req,res)=>{

    try{
        const message = new Message(req.body)

        await message.save()
        io.emit('message',req.body)
        res.status(200).send()
    }catch(e){
        res.status(500).send()
    }

})


io.on('connection',()=>{
    console.log('user connected')
})

const server = http.listen(port,()=>{
    console.log(`Server up on ${port}`)
})

module.exports = app