
const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');
const moment = require('moment');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));

const PORT = process.env.PORT || 8000 ;
const server = http.createServer(app);

const io = socket(server);

io.on('connection',function(socket){
    socket.on("chatting", (data)=>{
        const { name, msg } = data;
        
        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h:mm A")
        });
    });
})

server.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`);
});


