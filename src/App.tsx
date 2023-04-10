import React from 'react'
import { useRoutes } from 'react-router-dom'
import 'animate.css';
import router from './router'
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import BackTop from './components/BackTop';

export default function App() {
  let outlet = useRoutes(router)
  return (
    <>
      <Header />
      {
        outlet
      }
      <Footer />
      <BackTop/>
      
    </>
  )
}
