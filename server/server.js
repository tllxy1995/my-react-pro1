/**
 * Created by luoxinyi on 2018/1/23.
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat')

const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
    console.log('user login');
    socket.on('sendmsg', data => {
        console.log(data);
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid,from,to,content:msg}, (err, doc)=>{
            io.emit('recvmsg', Object.assign({},doc._doc))
        })
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, () => {
    console.log('Node app start at 9093');
});

