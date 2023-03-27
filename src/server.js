
import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use('/public', express.static(__dirname + '/public'));
app.get("/", (req,res) => res.render("home"));
app.get("/*" , (req,res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);

const wss = new WebSocket.Server({
    server
})

//브라우저 연결 소켓

wss.on("connection", (socket)=>{
    //브라우저와 연결되면 로그 찍고
    console.log('Connected to Browser')

    //브라우저와 연결이 끊어지면 로그찍음 ( 창을 닫음)
    socket.on("close", () => {
        console.log("Disconnected from Server No!!");
    });
    
    //브라우저에서 메세지를 보내면 콘솔로 찍음
    socket.on("message", (message) =>{
        console.log("Broweser to Server :", message.toString());
    });
    //브라우저에 메세지 보냄
    socket.send("hello!!!");
})

server.listen(3000, handleListen);