import { Component } from 'react'
import { Breadcrumb, Icon  } from 'antd'
import { Link } from 'umi'
import Block from 'fs-flex' 
import { connect } from 'dva'

const BreadcrumbItem = Breadcrumb.Item
class GlobalBreadcrumb extends Component{
    renderBreadcrumbView(){
        const { location, data } = this.props
        const pathSnippets = location.pathname.split('/').filter(item => item)
        const extraBreadcrumbItems = pathSnippets.map((item, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
            const isLink = index !== pathSnippets.length - 1 && item.path
            return (
              <BreadcrumbItem key={url}>
                {isLink?<Link to={url}>
                  {data[url].name}
                </Link>
                :<span>{data[url].name}</span>}
              </BreadcrumbItem>
            )
        })
        return [(extraBreadcrumbItems)]
    }
    menuToggleHandle = () => {
      this.props.dispatch({type: 'Global/menuToggle'})
    }
    render(){
        return <Block h={40} bc='#eaedf1' wf a='c'>
            <Block 
              h={40} a='c' 
              fs={18} 
              fc='#999' 
              bc='#f5f5f5' 
              pl={10} pr={15} mr={15}
              style={{cursor: 'pointer'}}
              onClick={this.menuToggleHandle}>
              <Icon type='menu-fold' />
            </Block>
            <Breadcrumb>
                {this.renderBreadcrumbView()}
            </Breadcrumb>
        </Block>
    }
}

export default connect(({ Global }) => ({
  Global
}))(GlobalBreadcrumb)