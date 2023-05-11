import React from 'react'
import { useRoutes } from 'react-router-dom'
import 'animate.css';
import router from './router'
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import BackTop from './components/BackTop';
// swiper【Autoplay:自动播放 ,Pagination:分页 ,Navigation:标记页数】
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation])

export default function App() {
  let outlet = useRoutes(router)
  return (
    <>
      <Header />
      {
        outlet
      }
      {/* <Footer /> */}
      <BackTop/>
      
    </>
  )
}
