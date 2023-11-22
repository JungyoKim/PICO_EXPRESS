import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const port = 80;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // 모든 도메인 허용
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('ultrasonicData', data => {
    io.emit('ultrasonicData', data);
  });

  socket.on('playSwitchData', data => {
    io.emit('playSwitchData', data);
  });

  socket.on('camSwitchData', data => {
    io.emit('camSwitchData', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
app.use(cors());
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
