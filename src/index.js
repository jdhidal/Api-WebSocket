const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const websocketServer = require('./websocket/websocketServer');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));


// Iniciar servidor WebSocket
websocketServer(server);

// Iniciar servidor HTTP
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
