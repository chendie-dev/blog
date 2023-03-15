import React from 'react'
import { Button, Modal, Form, Input, Space } from 'antd'
import { useAppDispatch } from '../../../Hooks/storeHook'
import { handleStatus } from '../../../store/ModelStatusSlice'
interface propsType {
  open: boolean,
  onCancel: any
}
const ForgetModel: React.FC<propsType> = (props) => {
  const dispatch=useAppDispatch()
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal {...props} footer={[]}>
      <div className='forget-wrapper' style={{width:'400px',margin:'auto'}}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className='loginItem'
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱号格式不正确' }]}
          >
            <Input placeholder="请输入您的邮箱" />
          </Form.Item>
          <Form.Item
            className='loginItem'
            label="验证码"
            name="vertifyCode"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder='请输入校验码' />
              <Button type="primary" style={{backgroundColor:'#4CAF50'}}>获取验证码</Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item
            className='loginItem'
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码格式不正确' }]}
          >
            <Input.Password placeholder="请输入您的密码" />
          </Form.Item>
          <Form.Item className='loginItem forgetItem'>
            <Button type="primary" htmlType="submit" style={{width:'100%',backgroundColor:'#4CAF50'}}>
              确定
            </Button>
          </Form.Item>
        </Form>
        <div >已有账号？<span style={{color:'#4CAF50',cursor:'pointer'}} onClick={()=>dispatch(handleStatus({status:2}))}>登陆</span></div>
      </div>
    </Modal>
  )
}
export default ForgetModel
