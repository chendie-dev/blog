import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../Hooks/storeHook'
import { handleStatus } from '../../../store/ModelStatusSlice'
import ForgetModel from '../../model/ForgetModel'
import LoginModel from '../../model/LoginModel'
import RegisterModel from '../../model/RegisterModel'
import SearchModel from '../../model/SearchModel'
import './index.css'
import { useNavigate } from 'react-router-dom'
const Header: React.FC = () => {
  const [navClass, setNavClass] = useState('nav animated slideInDown')
  const navigateTo=useNavigate()
  const { status } = useAppSelector((state) => ({
    status: state.modelStatus.status
  }))
  const dispatch=useAppDispatch()
  useEffect(() => {
    const scroll = () => {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 60) {
        setNavClass("nav-fixed");
      } else {
        setNavClass("nav");
      }
    }
    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  
  return (
    <>
      <header className={navClass}>
        <span className="author">网站作者</span>
        <div className="menus">
          <div className="menus-item">
            <a className="menu-btn" onClick={() => dispatch(handleStatus({status:1}))} >
              <i className="iconfont iconsousuo" />
              搜索
            </a>
          </div>
          <div className="menus-item" onClick={()=>navigateTo('/')}>
            <a className="menu-btn" >
              <i className="iconfont iconzhuye" />
              首页
            </a>
          </div>
          {/* <div className="menus-item">
            <a className="menu-btn">
              <i className="iconfont iconfaxian" />
              发现
              <i className="iconfont iconxiangxia2 expand" />
            </a>
            <ul className="menus-submenu">
              <li onClick={()=>navigateTo('/archives')}>
                <i className="iconfont iconguidang" />
                归档
              </li>
              <li>
                <i className="iconfont iconfenlei" />
                分类
              </li>
              <li>
                <i className="iconfont iconbiaoqian" />
                标签
              </li>
            </ul>
          </div> */}
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
          <div className="menus-item">
            <a className="menu-btn" >
              <i className="iconfont iconzhifeiji" />
              关于
            </a>
          </div>
          <div className="menus-item" onClick={()=>navigateTo('/message')}>
            <a className="menu-btn" >
              <i className="iconfont iconpinglunzu" />
              留言
            </a>
          </div>
          <div className="menus-item">
            <a className="menu-btn" onClick={() =>dispatch(handleStatus({status:2})) }  >
              <i className="iconfont icondenglu" />
              登录
            </a>
          </div>
        </div>
        <SearchModel open={status === 1} onCancel={() => dispatch(handleStatus({status:0}))} />
        <LoginModel open={status === 2} onCancel={() => dispatch(handleStatus({status:0}))} />
        <RegisterModel open={status === 3} onCancel={() => dispatch(handleStatus({status:0}))} />
        <ForgetModel open={status === 4} onCancel={() => dispatch(handleStatus({status:0}))} />
      </header>
    </>
  )
}
export default Header;
