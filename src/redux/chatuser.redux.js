/**
 * Created by luoxinyi on 2018/3/1.
 */
import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initState = {
    userlist: []
}

export const chatuser = (state = initState, action) => {
    switch (action.type) {
        case USER_LIST:
            return {...state, userlist: action.payload}
        default:
            return state
    }
}

const userList = data => ({type: USER_LIST, payload: data})

export const getUserList = type => dispatch => {
    axios.get('/user/list?type=' + type)
        .then(res => {
            if (res.data.code === 0) {
                dispatch(userList(res.data.data))
            }
        })
}