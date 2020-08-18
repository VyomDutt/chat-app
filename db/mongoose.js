const mongoose = require('mongoose')

const URL = "mongodb+srv://vyomdirt:vyomd0ntcare@cluster0.ddc3e.mongodb.net/chat-app?retryWrites=true&w=majority"

mongoose.connect(URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify: false,
})