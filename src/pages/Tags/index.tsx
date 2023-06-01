import React, { useEffect, useState } from 'react'
import './index.scss'
import { Card, Col, Row } from 'antd'
import { getTagListReq } from '../../requests/api'
import { useNavigate } from 'react-router-dom'
import { usePageContext } from '../../components/PageDataProvider'
export default function Tags() {
    const [tagList, setTagList] = useState<tagItemType[]>([])
    const navigateTo = useNavigate()
    const pages = usePageContext()

    useEffect(() => {
        getTagList()
    }, [])
    const getTagList = async () => {
        let res = await getTagListReq({
            orderByFields: {},
            pageNum: 1,
            pageSize: 100,
            queryParam: {
            }
        })
        if (res.code !== 200) return
        setTagList(res.data.data)
    }
    if (tagList.length == 0) return (<></>)
    else return (
        <div className='tags'>
            
            <div className="banner" style={{ background: `url(${pages.tagPageUrl}) center center / cover no-repeat` }}  >
                <div className="banner-detail">
                    <h1 className="banner-title">标签</h1>
                </div>
            </div>
            <Row className='content animated zoomIn'>
                <Col span={19} push={2}>
                    <Card bordered={false}>
                        <div className="tag-cloud">
                            {
                                tagList.map(el => {
                                    return (
                                        <a key={el.tagId} onClick={() => navigateTo(`/tags/${el.tagId}`, { state: el.tagName })}>{el.tagName}</a>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}
