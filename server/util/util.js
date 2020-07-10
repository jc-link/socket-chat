const createMessage = (username, message) => {
    return {
        username,
        message,
        date: new Date().getTime()
    }
}
module.exports = {
    createMessage
}