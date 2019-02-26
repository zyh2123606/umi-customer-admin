import { PureComponent } from 'react'
import Block from 'fs-flex'
import Style from './index.less'
import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
class SlideMenu extends PureComponent{
    state = {
        collapsed: false
    }
    collapsedHandle = e => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    //获取单一菜单
    getNavMenu(menu){
        if(!menu) return []
        return menu.filter(item => item.name).map(item => {
            return this.getSubMenu(item)
        }).filter(item => item)
    }
    //获取展开菜单
    getSubMenu(item){
        if(item.children && item.children.some(child => child.name)){
            return <SubMenu key={item.path} title={
                    <span>
                        {this.getMenuIcon(item.icon)}
                        <span>{item.name}</span>
                    </span>}
                >
                {this.getNavMenu(item.children)}
            </SubMenu>
        }
        return <MenuItem key={item.path}>
            {this.getMenuIcon(item.icon)}
            <span>{item.name}</span>
        </MenuItem>
    }
    //获取菜单图标
    getMenuIcon(icon){
        if(!icon) return null
        if(icon.startsWith('icon')) return <i className={`${Style[icon]} ${Style['menu-icon']}`} />
        return <Icon type={icon} />
    }
    //点击菜单
    menuClickHandle = ({item, key, keypath}) => {
        const { history } = this.props
        history.push(key)
    }
    render(){
        const { collapsed } = this.state
        const { data } = this.props
        return <Block w={!collapsed?180:'auto'} className={Style['bas-slide-menu']}>
            <Block j='c' fs={18} pb={7} pt={7}>
                <span onClick={this.collapsedHandle} style={{cursor: 'pointer'}}>
                    <Icon type={collapsed?'menu-unfold':'menu-fold'} />
                </span>
            </Block>
            <Menu 
                mode='inline'
                inlineCollapsed={collapsed}
                onClick={this.menuClickHandle}>
                {this.getNavMenu(data)}
            </Menu>
        </Block>
    }
}

export default SlideMenu