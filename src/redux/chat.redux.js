/**
 * Created by luoxinyi on 2018/3/5.
 */
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export const chat = (state = initState, action) => {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                users: action.payload.users,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
            }
        case MSG_RECV:
            const n = action.payload.to === action.userid ? 1 : 0
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
        case MSG_READ:
            const {from, num} = action.payload
            return {
                ...state, chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read})), unread: state.unread - num
            }
            console.log(state)
        default:
            return state
    }
}

const msgList = (msgs, users, userid) => ({type: MSG_LIST, payload: {msgs, users, userid}})

const msgRecv = (msg, userid) => ({userid, type: MSG_RECV, payload: msg})

const msgRead = ({from, to, num}) => ({type: MSG_READ, payload: {from, to, num}})


export const sendMsg = ({from, to, msg}) => dispatch => {
    socket.emit('sendmsg', {from, to, msg})
}
export const getMsgList = () => (dispatch, getState) => {
    axios.get('/user/getmsglist')
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userid = getState().user._id
                // console.log('getState', getState());
                console.log('getState', getState());
                console.log(res.data)
                dispatch(msgList(res.data.msgs, res.data.users, userid))
            }
        })
}

export const recvMsg = () => (dispatch, getState) => {
    socket.on('recvmsg', data => {
        const userid = getState().user._id
        // console.log('recvmsg', data);
        dispatch(msgRecv(data, userid))
    })
}

export const readMsg = (from) => (dispatch, getState) => {
    axios.post('/user/readmsg', {from})
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userid = getState().user._id
                dispatch(msgRead({userid, from, num: res.data.num}))
            }
        })
}