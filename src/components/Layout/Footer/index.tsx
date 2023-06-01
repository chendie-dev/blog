import React, { useEffect, useState } from 'react'
import './index.css'
export default function Footer() {
  var winHeight = window.innerHeight;
  const [height, setHeight] = useState(document.body.scrollHeight)
  useEffect(() => {
    setHeight(document.body.scrollHeight)
  }, [document.body.scrollHeight])
  return (
    <div className={winHeight-height<30?'footer-wrap':'footer-wrap fixed-bottom'}>
      <div>
        ©2023-
      </div>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        蜀ICP备2022012342号-1
      </a>
    </div>
  )
}
