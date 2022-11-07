const socket = io();


const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

socket.emit("select_room", {
  username,
  room
}, (messages) => {
  messages.forEach(message => createMessage(message));
});

const titleName = document.querySelector('#title_name');
const descriptionName = document.querySelector('#description_name');
titleName.innerText = `Conversa iniciada`;
descriptionName.innerText = `Esse chat foi iniciado por ${username} na sala ${room}`;

document.getElementById("input_message").addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value;

    const data = {
      room,
      message,
      username
    }

    socket.emit("message", data);
    event.target.value = "";
  }
})

document.getElementById("send_message").addEventListener("click", (event) => {
  const message = document.getElementById("input_message").value;

  const data = {
    room,
    message,
    username
  }

  socket.emit("message", data);
  document.getElementById("input_message").value = "";
})

socket.on("message", (data) => {
  createMessage(data);
});

function createMessage(data) {
  const messageDiv = document.getElementById("box-message");

  messageDiv.innerHTML += `
    <div class="${username === data.username ? 'ml-auto' : 'none'}">
      <span>${data.text}</span>
      <span class="message_user_send">Enviado por ${data.username}</span>
    </div>
  `
}

document.getElementById("loggout_button").addEventListener("click", (event) => {
  window.location.href = "index.html";
});

