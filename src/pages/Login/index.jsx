import React, { Component } from 'react'
import Block from 'fs-flex'
import { Form, Icon, Input, Button, Message } from 'antd'
import { connect } from 'dva'
import Style from './index.less'

const FormItem = Form.Item
class Login extends Component{
    handleSubmit = e => {
        e.preventDefault()
        const { form, dispatch } = this.props
        form.validateFields((err, params) => {
            if (err) return Message.warning('请输入用户名和密码再提交')
        
        })
    }
    render(){
        const { form: { getFieldDecorator } } = this.props
        return <Block className={Style.content}>
            <Block className={Style.panel}>
                <Block j='c' pb={20} fc='#fff' fs={20}>欢迎登录后台管理系统</Block>
                <Block className={Style.box}>
                    <Form layout='vertical' onSubmit={this.handleSubmit}>
                        <FormItem hasFeedback>
                            {getFieldDecorator('user_name', {
                                rules: [{required: true, message: '请输入登录账号'}]
                            })(
                                <Input placeholder='登录账号' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('user_pwd', {
                                rules: [{required: true, message: '请输入登录密码'}]
                            })(
                                <Input placeholder='登录密码' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button className={Style.btn} type='primary' icon='login' htmlType='submit'>登录</Button>
                        </FormItem>
                    </Form>
                </Block>
            </Block>
        </Block>
    }
}

export default connect()(
    Form.create()(Login)
)
