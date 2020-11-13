const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3001
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.json())

let player1 = {
    username: '',
    score : 0
}
let player2 = {
    username: '',
    score: 0
}
io.on('connection',(socket)=>{
    console.log('User Connected')
        socket.on('joinRoom', (payload) => {
            // console.log(payload);
            if (player1.username == '') {
                player1.username = payload
                console.log(payload, "<<< payload player1");
                socket.emit('enteringRoomPlayer1', player1)
            } else if (player2.username == '') {
                player2.username = payload
                console.log(payload, "<<< payload player 2");
                socket.emit('enteringRoomPlayer2', player2)
            }
        })
        socket.on('narikSocket', (data)=>{
            console.log(data, "<<< socket narik 1 server");
            if(data.role == 'Player 1') {
                player1.score = data.score
                io.emit('scorePlayer1', player1.score)
            } else if (data.role == 'Player 2') {
                player2.score = data.score
                io.emit('scorePlayer2', player2.score)
            }  
        })
})


http.listen(PORT,()=>{
    console.log(`I love you ${PORT}`)
})