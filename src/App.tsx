import { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import 'animate.css';
import router from './router'
import Header from './components/Layout/Header';
import BackTop from './components/BackTop';
import { message } from 'antd';
function BeforeRouterEnter() {
  let outlet = useRoutes(router)
  const location = useLocation()
  const token = localStorage.getItem('token')
  if (!token && location.pathname === '/setting') <ToHome />
  return outlet
}
function ToHome() {
  const navigateTo = useNavigate()
  useEffect(() => {
    message.error('你还没有登陆')
    navigateTo('/')
  }, [])
  return <></>
}
export default function App() {
  return (
    <>
      <Header />
      {BeforeRouterEnter()}
      <BackTop />

    </>
  )
}
