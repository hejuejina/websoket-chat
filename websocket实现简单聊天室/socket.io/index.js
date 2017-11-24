var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');  //sendfile相对路径  sendFile绝对路径
})
io.on('connection', function(socket){ //所有的操作都建立在连接的基础上
    console.log('a user connected' + socket); //刷新的时候先断开连接再进行连接
    socket.on('disconnect', function(){ 
        console.log('user disconnected');
      });
    socket.on('chat message' ,function(msg){ //接收消息
        console.log('message: '+ msg) ;
        io.emit('chat message',msg);
    })
  });
 
http.listen(3000,function(){
    console.log('服务开启');
});

