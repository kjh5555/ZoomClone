
import http from "http";
//import WebSocket from "ws";   WebSocket 임포트
import  SocketIO from "socket.io"; //SocketIO.ver
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use('/public', express.static(__dirname + '/public'));
app.get("/", (req,res) => res.render("home"));
app.get("/*" , (req,res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

//백엔드에서 연결받을 준비 완료
wsServer.on("connection", socket=>{
    socket.onAny((event)=>{
        console.log(`Socket Event:${event}`);
    });
    socket.on("enter_room", (roomName,showRoom) => {
         //socket on 할 때 app.js와 이벤트 이름 맞춰야함
        socket.join(roomName);
        showRoom();
    });
   
});


//WebSocket으로 구현한 코드
/*
const wss = new WebSocket.Server({ server });
const sockets = [];
//가상소켓

//브라우저 연결 소켓

wss.on("connection", (socket)=>{
    //가상소켓에 연결된 소켓을 집어넣기
    sockets.push(socket);
    socket["nickname"] = "Anon";
    //브라우저와 연결되면 로그 찍고
    console.log('Connected to Browser')
    //브라우저와 연결이 끊어지면 로그찍음 ( 창을 닫음)
    socket.on("close", () => {
        console.log("Disconnected from Server No!!");
    });
    
    //브라우저에서 메세지를 보내면 콘솔로 찍음
    socket.on("message", (msg) =>{
        const message = JSON.parse(msg.toString());


        switch(message.type){
            case "new_message":
                sockets.forEach((aSocket)=>aSocket.send(`${socket.nickname}: ${message.payload}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;

        }
        
        
    });
});
*/




httpServer.listen(3000, handleListen);