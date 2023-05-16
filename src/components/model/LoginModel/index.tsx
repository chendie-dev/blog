import React, { useState } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import './index.css'
import { useAppDispatch, useAppSelector } from '../../../Hooks/storeHook'
import { handleStatus } from '../../../store/ModelStatusSlice'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
interface propsType {
    open: boolean,
    onCancel: any
}
const LoginModel: React.FC<propsType> = (props) => {
    const {status}=useAppSelector(state=>({
        status:state.modelStatus.status
    }))
    const dispatch=useAppDispatch()
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal {...props} footer={[]} >
            <div className="login-container" style={{ borderRadius: "4px" }}>
                <div className="login-wrapper">
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            className='loginItem'
                            name="email"
                            rules={[{ required: true, message: '邮箱/用户名' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="邮箱/用户名"/>
                        </Form.Item>

                        <Form.Item
                            className='loginItem'
                            name="password"
                            rules={[{ required: true, message: '密码不能为空' },{ pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '至少八个字符，至少一个字母和一个数字组成' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="请输入你的密码" />
                        </Form.Item>
                        <Form.Item className='loginItem'>
                            <Button type="primary" htmlType="submit">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* <!-- 注册和找回密码 --> */}
                    <div className="mt-10 login-tip">
                        <span style={{cursor:'pointer'}} onClick={()=>dispatch(handleStatus({status:3}))}>立即注册</span>
                        {/* <span  style={{cursor:'pointer'}} onClick={()=>dispatch(handleStatus({status:4}))} className="float-right">忘记密码?</span> */}
                    </div>
                    {/* <!-- 三方登陆-- > */}
                    {/* <div >
                        <div className="social-login-title">社交账号登录</div>
                        <div className="social-login-wrapper">
                            <a
                                className="mr-3 iconfont iconweibo"
                                style={{ color: "#e05244" }}

                            />
                            <a
                                className="iconfont iconqq"
                                style={{ color: "#00AAEE" }}

                            />
                        </div>
                    </div> */}
                </div >
            </div >
        </Modal >
    )
}
export default LoginModel
