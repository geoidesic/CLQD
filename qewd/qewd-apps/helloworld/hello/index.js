module.exports = function (messageObj, session, send, finished) {
    finished({ hello: 'world' });
};