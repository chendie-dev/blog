import React, { useEffect, useState } from 'react'
import './index.scss'
import { Card, Col, Row } from 'antd'
import Footer from '../../components/Layout/Footer'
import { getTagListReq } from '../../requests/api'
import { useNavigate } from 'react-router-dom'
export default function Tags() {
    const [tagList,setTagList]=useState<tagItemType[]>([])
    const navigateTo=useNavigate()
    useEffect(()=>{
        getTagList()
    },[])
    const getTagList=async ()=>{
        let res=await getTagListReq({
            orderByFields:{},
            pageNum:1,
            pageSize:100,
            queryParam:{
                isDelete:false
            }
        })
        if(res.code!==200)return
        setTagList(res.data.data)
    }
    if(tagList.length==0)return(<></>)
    else return (
        <div className='tags'>
            {/* style={{ background: `url(${data.articleCoverUrl}) center center / cover no-repeat` }} */}
            <div className="banner animated slideInDown"   >
                <div className="article-detail">
                    <h1 className="article-title">标签</h1>
                </div>
            </div>
            <Row className='content animated zoomIn'>
                <Col span={19} push={2}>
                    <Card bordered={false}>
                        <div className="tag-cloud">
                           {
                            tagList.map(el=>{
                                return (
                                    <span key={el.tagId} onClick={()=>navigateTo(`/tags/${el.tagId}`)}>{el.tagName}</span>
                                )
                            })
                           }
                        </div>
                    </Card>
                </Col>
            </Row>
            <Footer />
        </div >
    )
}
