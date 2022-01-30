'use strict';

const socketio = require('socket.io');

const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT;

const server = socketio(PORT);
const caps = server.of('https://lab-14.herokuapp.com/'); // caps

// function newInsult(insult){
//   insultArray.push(insult);
// }

caps.on('connection', (socket) =>  {
  console.log('socket connected');

  // socket.on('join', room => {
  //   socket.join(room);
  // });

  socket.on('roastme', payload => {
    socket.broadcast.emit('roastme', payload);
    logger('roastme', payload.Id);
  });

  socket.on('thinking', (payload) => {
    socket.emit('thinking', payload);
    logger('thinking', payload.Id);
  });
  
  socket.on('hope this helps', payload => {
    socket.broadcast.emit('hope this helps', payload);
    // socket.emit('hope this helps', payload);
    logger('hope this helps', payload.Id);  
  });
});

function logger(event, payload) {
  let timestamp = new Date();
  console.log('Event' , event, timestamp);
}
