const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = function(event) {
  const messageList = document.getElementById('messageList');
  const li = document.createElement('li');

  if (event.data instanceof Blob) {
    // Si el mensaje es un Blob, leerlo como texto
    const reader = new FileReader();
    reader.onload = function() {
      li.textContent = reader.result;
      messageList.appendChild(li);
    };
    reader.readAsText(event.data);
  } else {
    // Si el mensaje no es un Blob, mostrarlo tal cual
    li.textContent = event.data;
    messageList.appendChild(li);
  }
};

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  ws.send(message);
  messageInput.value = '';
}