const socket = io();
socket.on("Hello",(msg)=>{
    console.log(msg);
    socket.emit("Hello2","All good wbu?");
})