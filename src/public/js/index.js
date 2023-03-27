const socket = new WebSocket(`ws://${window.location.host}`);
//서버로의 연결 소켓



//socket이 오픈되면 서버와 연결되었다고 표시
socket.addEventListener('open',() =>{
    console.log('Connected to Server')
});

//서버에서 보낸 메세지 이벤트로 받기
//서버에서 메세지를 보내면 발생
socket.addEventListener("message", (message)=>{
    console.log("New Message : ", message.data, "from the server");
});


//서버가 닫히면 발생
socket.addEventListener("close", ()=>{
    console.log('Connected form Server No!!!');
})

//서버에 답장 보내기
//10c초 텀을 두고
setTimeout(()=> {
    socket.send("hello from the browser!");
}, 5000);