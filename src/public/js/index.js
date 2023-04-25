const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = 'true';


let roomName;


function showRoom(){
    const h3 = room.querySelector('h3');
    h3.innerText = `Room ${roomName}`;
    welcome.hidden = true;
    room.hidden = false;
}





function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit("enter_room",input.value,showRoom);
    roomName = input.value;
    //emit은 소켓에 이벤트를 정의해줄 수 있음
    //이벤트 전송과 메세지를 Object로 전송가능
    //emit(이벤트이름, 전달JSON값, 콜백)

    input.value='';
}


form.addEventListener("submit", handleRoomSubmit);
