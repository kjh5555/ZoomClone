const socket = io();

const welcome = document.getElementById('welcome');
const enterForm = welcome.querySelector("form");
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = 'true';


let roomName;

function addMessage(message){
    const ul = room.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = message;
    ul.appendChild(li);
}


function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector('#msg input');
    const value = input.value;
    socket.emit('new_message', input.value, roomName, () =>{
        addMessage(`You :  ${value}`);
    });
    input.value = '';
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#nickname input");
    socket.emit('nickname', input.value);
}



function showRoom(){
    const h3 = room.querySelector('h3');
    h3.innerText = `Room ${roomName}`;
    welcome.hidden = true;
    room.hidden = false;
    const msgForm = room.querySelector('#msg');
    const nameForm = room.querySelector('#nickname');
    msgForm.addEventListener('submit',handleMessageSubmit);
    nameForm.addEventListener('submit', handleNicknameSubmit);
}





function handleRoomSubmit(event){
    const roomNameInput = enterForm.querySelector("#roomName");
    const nickNameInput = enterForm.querySelector("#name");
    event.preventDefault();
    socket.emit("enter_room", roomNameInput.value, nickNameInput.value, showRoom);
    roomName = roomNameInput.value;
    roomNameInput.value = "";
    const changeNameInput = room.querySelector("#name input");
    changeNameInput.value = nickNameInput.value;
    //emit은 소켓에 이벤트를 정의해줄 수 있음
    //이벤트 전송과 메세지를 Object로 전송가능
    //emit(이벤트이름, 전달JSON값, 콜백)

    input.value='';
};
enterForm.addEventListener("submit", handleRoomSubmit);


form.addEventListener("submit", handleRoomSubmit);


socket.on("welcome", (user)=>{
   addMessage(`${user} joined!`)
});

socket.on("bye", (left)=>{
    addMessage(`${left}someons left ㅠㅠ!`)
 });


socket.on("new_message", addMessage);

socket.on('room_change', (room)=>{
    roomList.innerHTML = "";
    if(rooms.length === 0){
        return;
    }
    const roomList = welcome.querySelector('ul');
    rooms.forEach(room =>{
        const li = document.createElement('li');
        li.innerText = room;
        roomList.append(li);
    });
});

