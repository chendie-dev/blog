import React from 'react'
import {MessageOutlined,DoubleRightOutlined} from '@ant-design/icons'
import './index.css'
export default function Swiper() {

  return (
    <div className="swiper-container">
    <MessageOutlined />
      <div className="rollScreen_container" style={{ height:'25px' }} id="rollScreen_container">
        <ul className="rollScreen_list">
            <li className="rollScreen_once">
            <span className="item" v-html="item" />测试说说
            </li>
            <li className="rollScreen_once">
            <span className="item" v-html="item" />测试说说</li>
        </ul>
      </div>
      <DoubleRightOutlined className="arrow"/>
    </div>
  )
}
