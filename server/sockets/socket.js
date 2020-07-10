const { io } = require('../server');
const { User } = require('../class/User');
const { createMessage } = require('../util/util');
const user = new User();

io.on('connection', (client) => {
    client.on('enterChat', (data, callback) => {
        if (!data.username || !data.room) {
            return callback({
                error: true,
                message: 'Username and room are required'
            });
        }

        client.join(data.room);
        let users = user.addUser(client.id, data.username, data.room);
        client.broadcast.to(data.room).emit('newUser', user.getUsersPerRoom(data.room));
        client.broadcast.to(data.room).emit('createMessage', createMessage('Admin', `${data.username} has join`));

        callback(users);

    });
    client.on('createMessage', (data, callback) => {
        let userChat = user.getUser(client.id);
        let message = createMessage(userChat.username, data.message);
        client.broadcast.to(userChat.room).emit('createMessage', message);

        callback(message);
    });
    //Private messages
    client.on('privateMessage', data => {
        let chatUser = user.getUser(client.id);
        client.broadcast.to(data.target).emit('privateMessage', createMessage(chatUser.username, data.message));
    });
    client.on('disconnect', () => {

        let deletedUser = user.deleteUser(client.id);
        client.broadcast.to(deletedUser.room).emit('createMessage', createMessage('Admin', `${deletedUser.username} left the chat`));
        client.broadcast.to(deletedUser.room).emit('newUser', user.getUsersPerRoom(deletedUser.room));
    });

})