const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.json())
io.on('connection',(socket)=>{
    console.log('User Connected')
})

http.listen(PORT,()=>{
    console.log(`I love you ${PORT}`)
})