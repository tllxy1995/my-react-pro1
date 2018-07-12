/**
 * Created by luoxinyi on 2018/3/1.
 */
import React from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        console.log(this.props)
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    v.avatar ?
                        (<Card
                            key={v.user}
                            onClick={() => this.handleClick(v)}
                            style={{zIndex: 1}}
                        >
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Body>
                            {v.type === 'boss' ? <div>公司:{v.company}</div> : null}

                            {v.desc.split('\n').map(d => (
                                <p key={d}>{d}</p>
                            ))}

                            {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
                            </Body>
                        </Card>)
                        : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard