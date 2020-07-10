var params = new URLSearchParams(window.location.search);
var username = params.get('username');
var room = params.get('room');
//jquery references
var usersDiv = $('#divUsuarios');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatBox = $('#divChatbox');
//render users
function usersRender(users) {
    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('room') + '</span></a>';
    html += '</li>';
    for (var i = 0; i < users.length; i++) {
        html += '<li>';
        html += '<a data-id="' + users[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[i].username + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    usersDiv.html(html);
}
function messagesRender(message, self) {
    var html = '';
    var date = new Date(message.date);
    var time = date.getHours() + ':' + date.getMinutes();
    var adminClass = 'info';
    if (message.username === 'Admin') {
        adminClass = 'danger';
    }
    if (self) {
        html += '<li class="reverse animated fadeIn"><div class="chat-content"><h5>' + message.username + '</h5>';
        html += '<div class="box bg-light-inverse">' + message.message + '</div></div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div><div class="chat-time">' + time + '</div></li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (message.username !== 'Admin') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
            html += '<h5>' + message.username + '</h5>';
        }
        html += '<div class="chat-content">';
        html += '<div class="box bg-light-' + adminClass + '">' + message.message + '</div></div>';
        html += '<div class="chat-time">' + time + '</div></li>';
    }
    divChatBox.append(html);
}

function scrollBotton() {
    var newMessage = divChatBox.children('li:last-child');

    var clientHeight = divChatBox.prop('clientHeight');
    var scrollTop = divChatBox.prop('scrollTop');
    var scrollHeight = divChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatBox.scrollTop(scrollHeight);
    }
}

//Listenners
usersDiv.on('click', 'a', function () {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});
sendForm.on('submit', function (e) {
    e.preventDefault();
    if (txtMessage.val().trim().length === 0) {
        return;
    }
    socket.emit('createMessage', {
        username,
        message: txtMessage.val()
    }, function (message) {
        txtMessage.val('').focus();
        messagesRender(message, true);
        scrollBotton();
    });
})