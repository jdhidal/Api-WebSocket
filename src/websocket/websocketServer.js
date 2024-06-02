const WebSocket = require('ws');

module.exports = function websocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws) {
    console.log('New client connected');

    ws.on('message', function incoming(message) {
      

      // Convertir el buffer a una cadena de texto
      const textMessage = message.toString();

      console.log('Received:', textMessage);

      // Reenviar el mensaje a todos los clientes conectados
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(textMessage);
        }
      });
    });

    ws.on('close', function close() {
      console.log('Client disconnected');
    });
  });
};

