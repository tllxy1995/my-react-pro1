/**
 * Created by luoxinyi on 2018/1/24.
 */
import {combineReducers} from 'redux';

import {user} from './redux/user.redux';
import {chatuser} from './redux/chatuser.redux'
import {chat} from './redux/chat.redux'

// 合并所有reducer并且返回
export default combineReducers({user, chatuser, chat});