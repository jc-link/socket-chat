class User {
    constructor() {
        this.users = [];
    }
    addUser(id, username, room) {
        let user = { id, username, room }
        this.users.push(user);
        return this.users;
    }

    getUser(id) {
        let user = this.users.filter(filteredUser => {
            return filteredUser.id === id
        })[0];
        return user;
    }

    getUsers() {
        return this.users;
    }

    getUsersPerRoom(room) {
        let usersInRoom = this.users.filter(filteredUser => filteredUser.room === room);
        return usersInRoom;
    }

    deleteUser(id) {
        let deletedUser = this.getUser(id);
        this.users = this.users.filter(filteredUser => {
            return filteredUser.id != id;
        });
        return deletedUser;
    }
}
module.exports = {
    User
}