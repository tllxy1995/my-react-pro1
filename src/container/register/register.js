/**
 * Created by luoxinyi on 2018/1/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Logo from '../../component/logo/logo';

import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';

import {register} from '../../redux/user.redux';
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
    state => state.user,
    {register}
)
@imoocForm
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    handleRegister() {
        this.props.register(this.props.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        console.log(this.props);
        console.log(this.props.state);
        console.log(this.props.redirectTo)
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}
                        >
                            用户名
                        </InputItem>
                        <WhiteSpace />
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('pwd', v)}
                        >
                            密码
                        </InputItem>
                        <WhiteSpace />
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('repeatpwd', v)}
                        >
                            确认密码
                        </InputItem>
                        <WhiteSpace />
                        <RadioItem
                            onChange={v => this.props.handleChange('type', 'genius')}
                            checked={this.props.state.type === 'genius'}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            onChange={v => this.props.handleChange('type', 'boss')}
                            checked={this.props.state.type === 'boss'}
                        >
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register;