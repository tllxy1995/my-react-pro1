/**
 * Created by luoxinyi on 2018/3/1.
 */
import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Genius extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        // console.log(this.state);
        return (
            <UserCard userlist={this.props.userlist}/>
        )
    }
}

export default Genius