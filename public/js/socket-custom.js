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
        // console.log('Connected users: ', response);
        usersRender(response);
    });
});

socket.on('createMessage', function (message) {
    messagesRender(message, false);
    scrollBotton();
});

socket.on('newUser', function (users) {
    usersRender(users);
})

//Private messages
socket.on('privateMessage', function (message) {
    console.log(message);
})