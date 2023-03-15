import React, { useEffect, useState } from 'react'
import './index.css'
export default function BackTop() {
    const [opacity,setOpacity]=useState(0)
    useEffect(()=>{
        window.addEventListener('scroll',scrollToTop)
        return ()=>{
            window.removeEventListener('scroll',scrollToTop)
        }
    },[])
    const backTop=()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }
    const scrollToTop=()=>{
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
          if(scrollTop>20)setOpacity(1)
          else setOpacity(0)
    }
  return (
    <div className="rightside" style={{opacity:opacity}}>
    <i onClick={backTop} className="iconfont rightside-icon iconziyuanldpi" />
  </div>
  )
}
