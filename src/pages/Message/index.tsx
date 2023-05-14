import React, { useEffect, useState } from 'react'

import SwiperComponent from './swiperComponent';
import './index.scss'
import { getMessageReq,addMessageReq } from '../../requests/api';
import { message } from 'antd';
export default function Messages() {
  const [messageList, setMessageList] = useState<messageItemType[][]>([])
  const [devideNum, setDevideNum] = useState(7)
  const [pageNum, setPageNum] = useState(1)//todo
  const [cntPage, setCntPage] = useState(1)
  const [isShow,setIsShow]=useState(0)
  const [messageVal,setMessageVal]=useState('')
  useEffect(() => {
      getMessageList()
  }, [])
  //获取留言列表
  const getMessageList = async () => {
    let res = await getMessageReq({
      orderByFields: { createTime: false },
      pageNum: cntPage,
      pageSize: 100,
      queryParam: {
        auditType: 2
      }
    })
    if(res.code!==200)return
    console.log(res)
    const result = cut(devideNum, res.data.data);
    setMessageList(el=>[...el,...result])
    setPageNum(res.data.totalPage)
    setCntPage(cnt=>cnt+1)
  }
  const addMessage=async ()=>{
    if(messageVal.replace(/\s*/g, '').length===0 ){
      message.error('不能为空')
      return
    }
    let res=await addMessageReq({messageContent:messageVal})
    if(res.code!==200)return
    setMessageVal('')
  }
  return (
    <>
      <div className="homePage">
        <div className="barrageContent">
          {
            messageList.map((item, index) => {
              return (
                <div className="barrageOuter" key={index}>
                  <SwiperComponent index={index} carouselInfo={item} />
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="message-container">
        <h1 className="message-title">留言板</h1>
        <div className="animated fadeInUp message-input-wrapper">
          <input
            placeholder="说点什么吧"
            onFocus={()=>setIsShow(1)}
            value={messageVal}
            onChange={(e)=>setMessageVal(e.target.value)}
            onKeyUp={(e)=>e.keyCode===13?addMessage():''}
          />
          <button
            className="ml-3 animated bounceInLeft"
            style={{ display:isShow===1?'block': 'none' }}
            onClick={addMessage}
          >
            发送
          </button>
        </div>
      </div>
    </>
  )
}
function cut(num: number, arr: messageItemType[]) {
  if (num < 2) {
    console.error("参数不合法");
  }
  const length = arr.length;
  if (length == 0) {
    return [];
  }
  const step = Math.ceil(length / num);
  const list = [];
  for (let i = 0; i < num; i++) {
    const start = i * step;
    const end = length - i * step > step ? (i + 1) * step : length;
    const part = arr.slice(start, end);
    list.push(part);
  }
  return list;
}

