import { Component } from 'react'
import { Breadcrumb  } from 'antd'
import { Link } from 'umi'
import Block from 'fs-flex' 

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
    render(){
        return <Block bc='#eaedf1'
            p={10}>
            <Breadcrumb>
                {this.renderBreadcrumbView()}
            </Breadcrumb>
        </Block>
    }
}

export default GlobalBreadcrumb