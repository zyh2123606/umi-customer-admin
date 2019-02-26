import Block from 'fs-flex'
import Style from './Layout.less'

const UserLayout = props => {
  return (
    <Block className={Style['usr-layout-container']}>
      {props.children}
      <Block j='c' pb={10} className={Style['usr-layout-footer']}>2019®CopyRight Background System</Block>
    </Block>
  )
}

export default UserLayout
