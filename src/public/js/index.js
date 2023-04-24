const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nick');
const socket = new WebSocket(`ws://${window.location.host}`);
//서버로의 연결 소켓

function makeMessage(type , payload){
    const msg = {type, payload}
    return JSON.stringify(msg)
}





//socket이 오픈되면 서버와 연결되었다고 표시
socket.addEventListener('open',() =>{
    console.log('Connected to Server')
});

//서버에서 보낸 메세지 이벤트로 받기
//서버에서 메세지를 보내면 발생
socket.addEventListener("message", (message)=>{
    const li = document.createElement('li');
    li.innerText = message.data;
    messageList.append(li);
});


//서버가 닫히면 발생
socket.addEventListener("close", ()=>{
    console.log('Connected form Server No!!!');
})

//서버에 답장 보내기





function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector('input');
    socket.send(
        makeMessage("nickname",input.value)
        
    );
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
