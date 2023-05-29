import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../Hooks/storeHook'
import { handleStatus } from '../../../store/ModelStatusSlice'
import LoginModel from '../../model/LoginModel'
import RegisterModel from '../../model/RegisterModel'
import SearchModel from '../../model/SearchModel'
import './index.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { Avatar, Divider, Popover, Space } from 'antd'
import { DownOutlined, HomeFilled, PlayCircleOutlined, UserOutlined } from '@ant-design/icons'
import MyIcon from '../../MyIcon'
import { useUserData, useUserDataDispatch } from '../../UserDataProvider'
import { logoutReq } from '../../../requests/api'
const Header: React.FC = () => {
  const [navClass, setNavClass] = useState('nav animated slideInDown')
  const navigateTo = useNavigate()
  const { status } = useAppSelector((state) => ({
    status: state.modelStatus.status
  }))
  const dispatch = useAppDispatch()
  const userData=useUserData()
  const userDispatch=useUserDataDispatch()
  const [imgUrl,setImgUrl]=useState('')
  useEffect(() => {
    const scroll = () => {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 60) {
        setNavClass("nav-fixed animated slideInDown");
      } else {
        setNavClass("nav");
      }
    }
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  useEffect(()=>{
    if(localStorage.getItem('token')){
      userDispatch('getuser')
    }
    window.addEventListener('message', ({ data, origin }) => {
      // console.log('blog',typeof(data),origin)
      if(origin==='http://localhost:3000')localStorage.setItem('user-token', data)
    })
  },[])
  useEffect(()=>{
    setImgUrl(userData.avatarUrl)
  },[userData])
  const logout=async ()=>{
    localStorage.removeItem('token')
    userDispatch('getuser')
    await logoutReq()
    setImgUrl('')
  }
  return (
    <>
      <header className={navClass}>
        <span className="author">网站作者</span>
        <div className="menus">
          <div className="menus-item">
            <a className="menu-btn" onClick={() => dispatch(handleStatus({ status: 1 }))} >
              <Space>
                <MyIcon type='icon-sousuo' />
                搜索
              </Space>
            </a>
          </div>
          <div className="menus-item" onClick={() => navigateTo('/')}>
            <a className="menu-btn" >
              <Space>
                <HomeFilled />
                首页
              </Space>
            </a>
          </div>
          <div className="menus-item">
            <a className="menu-btn">
              <Space>
                <PlayCircleOutlined />
                发现
                <DownOutlined />
              </Space>
            </a>
            <ul className="menus-submenu">
              {/* <li onClick={()=>navigateTo('/archives')}>
                <i className="iconfont iconguidang" />
                归档
              </li> */}
              <li onClick={() => navigateTo('/categories')}>
                <Space>
                  <MyIcon type='icon-category_fill' />
                  分类
                </Space>
              </li>
              <li onClick={() => navigateTo('/tags')}>
                <Space>
                  <MyIcon type='icon-tag-fill' />
                  标签
                </Space>
              </li>
            </ul>
          </div>
          {/* <div className="menus-item">
            <a className="menu-btn">
              <i className="iconfont iconqita" />
              娱乐
              <i className="iconfont iconxiangxia2 expand" />
            </a>
            <ul className="menus-submenu">
              <li>
                <i className="iconfont iconxiangce1" />
                相册
              </li>
              <li>
                <i className="iconfont iconpinglun" />
                说说
              </li>
            </ul>
          </div> */}
          <div className="menus-item" onClick={() => navigateTo('/about')}>
            <a className="menu-btn" >
              <Space>
                <MyIcon type='icon-paper-full' />
                关于
                {/* <Navigate to={'/about'}/> */}
              </Space>
            </a>
          </div>
          <div className="menus-item" onClick={() => navigateTo('/message')}>
            <a className="menu-btn" >
              <Space>
                <MyIcon type='icon-liuyan' />
                留言
              </Space>
            </a>
          </div>
          {
            imgUrl==='' ?
              (<div className="menus-item">
                <a className="menu-btn" onClick={() => dispatch(handleStatus({ status: 2 }))}  >
                  <Space>
                    <UserOutlined style={{ fontWeight: 'bolder' }} />
                    登录
                  </Space>
                </a>
              </div>) :
              (<div className="menus-item">
                <Popover content={(<div>
                  <p style={{ cursor: 'pointer' }} className='exit' onClick={()=>navigateTo('/setting')}><MyIcon type='icon-yonghu' style={{ marginRight: '10px' }} />个人中心</p>
                  <Divider style={{margin:6}}/>
                  <p style={{ cursor: 'pointer' }} className='exit' onClick={()=>logout()}><MyIcon type='icon-tuichu' style={{ marginRight: '10px' }} />退出登陆</p>
                </div>)}>
                  <Avatar size="large" src={imgUrl} style={{ top: '-8px' }} icon={<UserOutlined />} />
                </Popover>
              </div>)
          }
        </div>

        <SearchModel open={status === 1} onCancel={() => dispatch(handleStatus({ status: 0 }))} />
        <LoginModel open={status === 2} onCancel={() => dispatch(handleStatus({ status: 0 }))} />
        <RegisterModel open={status === 3} onCancel={() => dispatch(handleStatus({ status: 0 }))} />
      </header>
    </>
  )
}
export default Header;
