var socket = io();
var params = new URLSearchParams(window.location.search);
if (!params.has('username') && !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Username is required..')
}
var user = {
    username: params.get('username'),
    room: params.get('room')
}
socket.on('connect', function () {
    console.log('Connected to server..');
    socket.emit('enterChat', user, function (response) {
        console.log('Connected users: ', response);
    });
});

socket.on('createMessage', function (message) {
    console.log(message);
});

socket.on('newUser', function (users) {
    console.log(users);
})

//Private messages
socket.on('privateMessage', function (message) {
    console.log(message);
})