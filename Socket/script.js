const express=require('express');
const path=require('path');
const app=require('express')();
const server=require('http').createServer(app);
const io=require('socket.io')(server);

app.use(express.static(path.join(__dirname,"static")));
io.on('connection',(socket)=>{
    console.log(socket);
    socket.emit("Hello","Yo sup");
    socket.on("Hello2",(msg)=>{
        console.log(msg);
    })
})

server.listen(3000);