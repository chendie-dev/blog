import React, { useState } from 'react'
import { Button, Modal, Form, Input, Space, message } from 'antd'
import './index.css'
import { useAppDispatch } from '../../../Hooks/storeHook'
import { handleStatus } from '../../../store/ModelStatusSlice'
import { checkEmailReq, checkUsernameReq, getCaptchaReq, registerReq } from '../../../requests/api'
interface propsType {
  open: boolean,
  onCancel: any
}
const RegisterModel: React.FC<propsType> = (props) => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [captchaBtnVal, setCaptchaBtnVal] = useState('发送验证码')
  const onFinish = async (values: registerParams) => {
    if (values.password !== values.rePassword) {
      message.error('重复密码输入错误')
      return
    }
    let res = await registerReq(values)
    if (res.code !== 200) {
      message.error('验证码错误')
      return
    }
    dispatch(handleStatus({ status: 2 }))
  };
  const getCaptcha = async () => {
    await getCaptchaReq({ mail: email })
    let time = 3
    let a = setInterval(() => {
      if (time === 0) {
        setCaptchaBtnVal('重新发送')
        clearInterval(a)
        return
      }
      setCaptchaBtnVal(time - 1 + 's')
      time--
    }, 1000)
  }
  return (
    <Modal {...props} footer={[]}>
      <div className="register-wrapper">
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 8 }}
          labelAlign='left'
          layout='vertical'
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名不能为空' }, () => ({
              async validator(_, value) {
                let res = await checkUsernameReq(value)
                if (res.data) return Promise.resolve();
                return Promise.reject(new Error('用户名已存在'));
              },
            })]}
          >
            <Input placeholder="请输入你的用户名" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱不能为空' }, { pattern: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, message: '邮箱格式不正确' }, () => ({
              async validator(_, value) {
                let res = await checkEmailReq(value)
                if (res.data) return Promise.resolve();
                return Promise.reject(new Error('该邮箱已注册'));
              },
            })]}
          >
            <Input placeholder="请输入你的邮箱" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: '验证码不能为空' }]}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder='请输入校验码' />
              <Button type="primary" onClick={getCaptcha} disabled={captchaBtnVal.charAt(captchaBtnVal.length - 1) === 's'} >{captchaBtnVal}</Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空' }, { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '至少八个字符，至少一个字母和一个数字组成' }]}
          >
            <Input.Password placeholder="请输入你的密码" />
          </Form.Item>
          <Form.Item
            label="再次输入密码"
            name="rePassword"
            rules={[{ required: true, message: '密码不能为空' }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('你输入的两个密码不匹配!'));
              },
            })]}
          >
            <Input.Password placeholder="请输入你的密码" />
          </Form.Item>
          <Form.Item className='registItem'>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
        <div className="toLogin">已有账号？<a style={{ color: '#2196F3', cursor: 'pointer' }} onClick={() => dispatch(handleStatus({ status: 2 }))}>登陆</a></div>
      </div>
    </Modal>
  )
}
export default RegisterModel
