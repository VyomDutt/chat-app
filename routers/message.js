const express = require('express')
const Message = require('../models/message')
const { isValidObjectId } = require('mongoose')
const app = require('../server')
const http = require('http').Server(app)
const io = require('socket.io')(http)


const router = new express.Router()

router.get('/messages',(req,res)=>{
    Message.find({},(err,messages)=>{
        if(err){
            return res.status(500).send()
        }
        res.send(messages)

    })
})

router.post('/messages',async (req,res)=>{
    const message = new Message(req.body)

    try{
        await message.save()
        io.emit('message',req.body)
        res.status(200).send()
    }catch(e){
        res.status(500).send()
    }

})

module.exports = router