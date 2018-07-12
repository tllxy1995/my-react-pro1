/**
 * Created by luoxinyi on 2018/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Logo from '../../component/logo/logo';

import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

import {login} from '../../redux/user.redux';
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
    state => state.user,
    {login}
)
@imoocForm
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.props.login(this.props.state);
    }

    register() {
        this.props.history.push('/register');
    }


    render() {
        console.log(this.props.redirectTo)
        return (
            <div>
                {(this.props.redirectTo && this.props.redirectTo !== '/login') ?
                    <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}
                        >
                            用户
                        </InputItem>
                        <WhiteSpace />
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('pwd', v)}
                        >
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

export default Login;