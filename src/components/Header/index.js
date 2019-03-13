import { Component } from 'react'
import Block from 'fs-flex'
import { Icon, Avatar, Menu, Dropdown, Badge } from 'antd'
import { connect } from 'dva'
import Style from './index.less'

const MenuItem = Menu.Item
class Header extends Component{
    menHandleChange = ({ key }) => {
        const { dispatch } = this.props
        if(key === 'update_pwd')
            dispatch({type: 'Global/pwdWinToggle'})
    }
    userMenu = <Menu onClick={this.menHandleChange}>
        <MenuItem key='system_info'><Icon type='message' />系统消息</MenuItem>
        <MenuItem key='u_info'><Icon type='solution' />用户信息</MenuItem>
        <MenuItem key='update_pwd'><Icon type='lock' />修改密码</MenuItem>
        <Menu.Divider />
        <MenuItem key='logout'><Icon type='logout' />退出系统</MenuItem>
    </Menu>
    render(){
        return <Block wf className={Style['bas-layout-header']}>
            <Block></Block>
            <Block f={1}></Block>
            <Block wf fc='#fff' a='c' mr={20}>
                <Block>
                    <Dropdown overlay={this.userMenu}>
                        <Block wf a='c' style={{cursor: 'pointer'}}>
                            <Badge dot><Avatar size='small' style={{ backgroundColor: '#f56a00' }} icon="user"/></Badge>
                            <Block ml={10}>zyh2123606</Block>
                        </Block>
                    </Dropdown>
                </Block>
            </Block>
        </Block>
    }
}

export default connect(({ Global }) => ({
    Global
}))(Header)