import React, { PureComponent } from 'react'
import Block from 'fs-flex'
import { formatMessage } from 'umi/locale'
import isEqual from 'lodash/isEqual'
import memoizeOne from 'memoize-one'
import { connect } from 'dva'
import Header from '@/components/Header'
import SlideMenu from '@/components/SlideMenu'
import Breadcrumb from '@/components/Bread'
import UpdatePwdWin from '@/components/UpdatePwd'
import Style from './Layout.less'

const formatMenu = (menuData = [], auth = [], parentName) => {
    return menuData.map(item => {
        if(!item.name || !item.path) return null 
        let locale = 'menu'
        if(parentName){
            locale = `${parentName}.${item.name}`
        }else{
            locale = `menu.${item.name}`
        }
        let result = {
            ...item,
            name: formatMessage({ id: locale, defaultMessage: item.name }),
            locale
        }
        if(item.routes)
            result.children = formatMenu(item.routes, auth, locale)
        delete result.routes
        return result
    }).filter(item => item)
}
const memoizeOneFormatter = memoizeOne(formatMenu, isEqual)

class BasicLayout extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            menuData: this.getMenuData()
        }
        this.getBreadcrumbNameMap = memoizeOne(this.getBreadMap, isEqual)
        this.breadMap = this.getBreadcrumbNameMap()
    }
    getMenuData(){
        const { route: { routes } } = this.props
        return memoizeOneFormatter(routes)
    }
    //获取面包屑导航
    getBreadMap(){
        const breadMap = {}
        const merageRouterBread = data => {
            data.forEach(item => {
                if(item.children) merageRouterBread(item.children)
                breadMap[item.path] = item
            })
        }
        merageRouterBread(this.getMenuData())
        return breadMap
    }
    getSnapshotBeforeUpdate(preProps, preState, snapshot){
        return this.props.location
    }
    componentDidUpdate(preProps, preState, { pathname }){
        if(preProps.location.pathname !== pathname) this.breadMap = this.getBreadMap()
    }
    render(){
        const { menuData } = this.state
        return <Block w='100%' h='100%' vf>
            <Header />
            <Block f={1} wf>
                <SlideMenu data={menuData} {...this.props} />
                <Block vf f={1} className={Style['bas-layout-content']}>
                    <Breadcrumb data={this.breadMap} {...this.props} />
                    <Block f={1} className={Style['bas-layout-panel']}>
                        {this.props.children}
                    </Block>
                </Block>
            </Block>
            {/* 修改密码 */}
            <UpdatePwdWin />
        </Block>
    }
}
export default connect(({ Global }) => ({
    Global
}))(BasicLayout)
