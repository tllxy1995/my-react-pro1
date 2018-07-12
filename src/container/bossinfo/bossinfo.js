/**
 * Created by luoxinyi on 2018/2/23.
 */
import React from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {update} from '../../redux/user.redux';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

@connect(
    state => state.user,
    {update}
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const redirect = this.props.redirectTo;
        const path = this.props.location.pathname;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={redirect}/> : null}
                <NavBar mode="dark">BOSS完善页面</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                />
                <InputItem onChange={v => this.onChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={v => this.onChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={v => this.onChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    rows={3}
                    autoHeight
                    title="职位要求"
                    onChange={v => this.onChange('desc', v)}
                >
                    职位要求
                </TextareaItem>
                <Button
                    type="primary"
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                >
                    保存
                </Button>
            </div>
        )
    }
}

export default BossInfo;