import { Component } from 'react'
import Block from 'fs-flex'
import Style from './index.less'

class Header extends Component{
    render(){
        return <Block className={Style['bas-layout-header']}></Block>
    }
}

export default Header