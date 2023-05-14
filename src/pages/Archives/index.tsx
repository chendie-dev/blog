import React, { useEffect, useLayoutEffect, useState } from 'react'
import './index.scss'
import { Card, Pagination, Timeline } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { useArticleListData, useArticleListDataDispatch } from '../../components/Context/ArticleListDateProvider'
import Footer from '../../components/Layout/Footer'
export default function Archives() {
    const articleList = useArticleListData()
    const articleDispatch = useArticleListDataDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage,setTotalPage]=useState(0)
    const [items, setItems] = useState<{dot:JSX.Element,children:JSX.Element}[]>()
    useLayoutEffect(() => {
        if (articleList.data.data.length === 0) return
        initArticleList(articleList.data.data)
        setTotalPage(articleList.data.totalPage)
    }, [articleList])
    useEffect(() => {
        articleDispatch({
            type: 'getArticleListData',
            payload: {
                orderByFields: { createTime: false },
                pageNum: currentPage,
                pageSize: 10,
                queryParam: {
                    isDelete: false,
                    articleStatus:1
                }
            }
        })
    }, [currentPage])
    const initArticleList = (articleList: articleItemType[]) => {
        let arr = [
            {
                dot: <i className='dot' style={{ height: 18, width: 18 }} />,
                children: (<>
                    <div className='child-node' style={{color:'#37414A'}}>目前共计{1}篇文章</div>
                </>),
            },
        ]
        let newArr = articleList.map(el => {
            return {
                dot: <i className='dot' />,
                children: (
                    <div className='child-node'>
                        <span className='time' style={{fontSize:12,marginRight:16}}>{el.createTime}</span>
                        <span className='title'>{el.articleTitle}</span>
                    </div>),
            }
        })
        arr.push(...newArr)
        setItems(arr)
    }
    return (
        <div>
            <div className="banner" >
                <h1 className="banner-title">归档</h1>
            </div>
            <Card style={{ width: '70%', margin: '40px auto' }} bordered={false} className='time-card'>

                <Timeline
                    items={items}
                />
                <Pagination defaultCurrent={1} total={totalPage*10} pageSize={10} onChange={(page)=>setCurrentPage(page)} style={{ margin: '40px auto', textAlign: 'center' }} />
            </Card>
            <Footer/>
        </div>
    )
}
