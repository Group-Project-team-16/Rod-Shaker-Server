const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3001
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.json())

let scoreOne = 0
let scoreTwo = 0
io.on('connection',(socket)=>{
    console.log('User Connected')
        socket.on('narik1', (score) => {
            scoreOne = score
            console.log(scoreOne);
            io.emit('narik1', scoreOne)
        })

        socket.on('narik2', (score) => {
            scoreTwo = score
            io.emit('narik2', scoreTwo)
        })
})


http.listen(PORT,()=>{
    console.log(`I love you ${PORT}`)
})