/**
 * Created by luoxinyi on 2018/2/28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state
)
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        const navList = this.props.data.filter(v => !v.hide)
        // console.log(navList);
        console.log(this.props.chat.unread);
        const {pathname} = this.props.location

        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        badge={v.path === '/msg' ? this.props.chat.unread : 0}
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    />
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar