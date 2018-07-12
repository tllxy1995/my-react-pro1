/**
 * Created by luoxinyi on 2018/1/24.
 */
import axios from 'axios';
import {getRedirectPath} from '../util';

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
};

// reducer
export const user = (state = initState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {...state, msg: action.msg};
        case LOGOUT:
            return {...initState, redirectTo: '/login'}
        default:
            return state;
    }
};

const authSuccess = obj => {
    const {pwd, ...data} = obj;
    return {type: AUTH_SUCCESS, payload: data};
};

export const loadData = data => ({type: LOAD_DATA, payload: data})

export const logoutSubmit = data => ({type: LOGOUT, payload: data})

const errorMsg = msg => ({msg, type: ERROR_MSG})

export const login = ({user, pwd}) => {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入！');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
};

export const register = ({user, pwd, repeatpwd, type}) => {
    if (!user || !pwd || !repeatpwd) {
        return errorMsg('用户名密码必须输入！');
    }

    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同！');
    }

    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
};

export const update = (data) => dispatch => {
    axios.post('/user/update', data)
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
}
