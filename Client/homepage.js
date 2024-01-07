document.addEventListener('DOMContentLoaded', function () {
  const socket = io('http://localhost:3000');

  const chatRoom = document.getElementById('chatRoom');
  const chatRoomsList = document.getElementById('chatRoomsList');
  const chatMessages = document.getElementById('chatMessages');
  const messageForm = document.getElementById('messageForm');
  const createRoomForm = document.getElementById('createRoomForm');
  const roomNameInput = document.getElementById('roomNameInput');
  const privateRoomCheckbox = document.getElementById('privateRoomCheckbox');
  const messageInput = document.getElementById('messageInput');

  const username = prompt('Enter your username:'); 
  socket.emit('setUsername', username);

  messageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
      socket.emit('sendMessage', { message });
      messageInput.value = '';
    }
  });

 /* createRoomForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const roomName = roomNameInput.value.trim();
    const isPrivate = privateRoomCheckbox.checked;

    socket.emit('createRoom', { roomName, isPrivate });
  });
*/
  socket.on('message', function (data) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.user}: ${data.message}`;
    chatMessages.appendChild(messageElement);
  });

  /*socket.on('updateRoomsList', function (rooms) {
    chatRoomsList.innerHTML = '';

    rooms.forEach((room) => {
      const roomElement = document.createElement('div');
      roomElement.textContent = `Room: ${room.name} | ${room.isPrivate ? 'Private' : 'Public'}`;
      chatRoomsList.appendChild(roomElement);
    });
  });*/

  socket.on('initialMessages', function (messages) {
    messages.forEach((data) => {
      const messageElement = document.createElement('div');
      messageElement.textContent = `${data.user}: ${data.message}`;
      chatMessages.appendChild(messageElement);
    });
  });
});
