import { Modal, Form, Input } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item
const UpdatePwd = ({ pwdVisible, dispatch, form, form:{ getFieldDecorator } }) => {
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 19 }
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        form.validateFields((err, values) => {
            if(err) return
        })
    }
    const hideWin = e => {
        form.resetFields()
        dispatch({type: 'Global/pwdWinToggle'})
    }
    return <Modal visible={pwdVisible}
        title='修改密码'
        width={450}
        onOk={handleSubmit}
        onCancel={hideWin}>
        <Form layout='horizontal'>
            <FormItem {...formItemLayout} label='账号' hasFeedback>
                {getFieldDecorator('user_name')(
                    <Input disabled />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label='密码' hasFeedback>
                {getFieldDecorator('pwd', {rules: [
                    {required: true, message: '请输入密码'}
                ]})(
                    <Input maxLength={20} placeholder='请输入密码' />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label='重复密码' hasFeedback>
                {getFieldDecorator('re_pwd', {rules: [
                    {required: true, message: '请再次输入密码'}
                ]})(
                    <Input maxLength={20} placeholder='请再次输入密码' />
                )}
            </FormItem>
        </Form>
    </Modal> 
}

export default connect(({ Global }) => ({
    pwdVisible: Global.pwdVisible
}))(
    Form.create()(UpdatePwd)
)