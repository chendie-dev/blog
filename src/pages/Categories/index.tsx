import React, { useEffect, useState } from 'react'
import './index.scss'
import { Card, Col, Row } from 'antd'
import { getCategoryListReq } from '../../requests/api'
import { useNavigate } from 'react-router-dom'
import { usePageContext } from '../../components/PageDataProvider'
export default function Categories() {
  const [categoriesList, setCategoriesList] = useState<categoryItemType[]>([])
  const navigateTo=useNavigate()
  const pages=usePageContext()

  useEffect(() => {
    getCategories()
  }, [])
  const getCategories = async () => {
    let res = await getCategoryListReq({
      orderByFields: {},
      pageNum: 1,
      pageSize: 100,
      queryParam: {
      }
    })
    if (res.code !== 200) return
    setCategoriesList(res.data.data)
  }
  if(categoriesList.length==0)return (<></>)
  else return (
    <div className='categories'>
      
      <div className="banner" style={{ background: `url(${pages.categoryPageUrl}) center center / cover no-repeat` }}  >
        <div className="banner-detail">
          <h1 className="banner-title">分类</h1>
        </div>
      </div>
      <Row className='content animated zoomIn'>
        <Col span={19} push={2}>
          <Card bordered={false}>
            <ul className="category-list">
              {
                categoriesList.map(el => {
                  return (
                    <li className="category-list-item" key={el.categoryId} onClick={()=>navigateTo(`/categories/${el.categoryId}`,{state:el.categoryName})}>
                      <span>{el.categoryName}</span>
                    </li>)
                })
              }
            </ul>
          </Card>
        </Col>
      </Row>
    </div >
  )
}
