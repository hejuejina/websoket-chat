var ws = require("nodejs-websocket")
var port = 3000;

var clientCount = 0 ;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++ ;
    conn.nickname = "user" + clientCount ;

    var mes = {} ;
    mes.type = "enter" ;  //
    mes.data = conn.nickname + 'come in' ;
    sendClient(JSON.stringify(mes)); //给客户端传输数据

	conn.on("text", function (str) {
		console.log("Received "+str)
        // conn.sendText(str.toUpperCase()+"!!!")
        var mes = {};
        mes.type = "message" ;  //
        mes.data =  conn.nickname +':'+str;
        sendClient(JSON.stringify(mes));
	})
	conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var mes = {};
        mes.type = "leave" ;  //
        mes.data = conn.nickname + 'leave';
        sendClient(JSON.stringify(mes));
    })
    conn.on("error",function(err){
        console.log("处理错误");
        console.log(err)
    });
}).listen(port);

console.log('websocket server listenning on port' + port);

function sendClient(str){
    server.connections.forEach(function(connection){
        connection.sendText(str);
    })
} 