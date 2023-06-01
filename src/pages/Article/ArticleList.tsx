import { Card, Col, Divider, Row, Space } from 'antd'
import  { useState } from 'react'
import './index.scss'
import MyIcon from '../../components/MyIcon'
import { useLocation, useNavigate } from 'react-router-dom'
import { getArticleListReq, getCategoryListReq, getCommentListReq, getTagListReq } from '../../requests/api'
import { InfiniteScroll } from 'antd-mobile'
import { FormatData } from '../../Hooks/formatData'
import { usePageContext } from '../../components/PageDataProvider'
export default function ArticleList() {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const type = location.pathname.split('/')[1]
  const name = location.state
  const [articleList, setArticleList] = useState<articleItemType[]>([])
  const [hasMore, setHasMore] = useState(true)//无限刷新是否还有更多
  const [currentPage, setCurrentPage] = useState(1)
  const pages=usePageContext()
  const navigateTo = useNavigate()
  const getArticleList = async () => {
    let res = await getArticleListReq({
      orderByFields: {},
      pageNum: currentPage,
      pageSize: 3,
      queryParam: {
        categoryId: type === 'categories' ? id : null,
        tagIds: type === 'categories' ? null : [id],
      }
    })
    if (res.code !== 200) return
    // console.log('get', res)
    setCurrentPage(currentPage + 1)
    initArticleList(res)
    setHasMore(res.data.data.length > 0)
  }
  
  
  const initArticleList = async (res: articleListRes) => {
    let articleListContext1: articleListRes = JSON.parse(JSON.stringify(res))
    let articleList = await Promise.all(
      articleListContext1.data.data.map(async (el) => {
        let res1 = await Promise.all(
          el.tagIds.map(el1 => {
            return getTagListReq({
              orderByFields: {},
              pageNum: 1,
              pageSize: 1,
              queryParam: {
                tagId: el1,
              }
            });
          })
        );
        for (let i = 0; i < res1.length; i++) {
          el.tagIds[i] += '.' + res1[i].data.data[0].tagName;
        }
        let res2 = await getCategoryListReq({
          orderByFields: {},
          pageNum: 1,
          pageSize: 1,
          queryParam: {
            categoryId: el.categoryId,

          }
        });
        el.categoryId += '.' + res2.data.data[0].categoryName
        el.createTime = FormatData(el.createTime)
        return el
      })
    )
    setArticleList(val => [...val, ...articleList])
  }
  return (
    <div>
      <div className='article-list'>
        
        <div className="banner" style={{ background: `url(${pages.categoryPageUrl}) center center / cover no-repeat` }}  >
          <div className="banner-detail">
            <h1 className="banner-title">{type === 'tags' ? '标签' : '分类'}-{name}</h1>
          </div>
        </div>
        <Row className='content'>
          <Col span={19} push={2}>
            <ul>
              {articleList.map(el => {
                return (
                  <li key={el.articleId}>
                    <Card bordered={false} className='animated zoomIn' >
                      <a onClick={() => navigateTo(`/article/${el.articleId}`)}>
                        <img src={el.articleCoverUrl} alt="" />
                      </a>
                      <div className="article-item-info">
                        <a onClick={() => navigateTo(`/article/${el.articleId}`)} style={{ cursor: 'pointer' }}>{el.articleTitle}</a>
                        <div style={{ marginTop: "0.375rem" }}>
                          <span ><Space><MyIcon type='icon-rili' />{el.createTime}</Space></span>
                          <a
                            style={{ float: 'right', cursor: 'pointer' }}
                            onClick={() => navigateTo(`/categories/${el.categoryId.split('.')[0]}`, { state: el.categoryId.split('.')[1] })}>
                            <Space>
                              <MyIcon type='icon-category_fill' />
                              {el.categoryId.split('.')[1]}
                            </Space>
                          </a>
                        </div>
                      </div>
                      <Divider style={{ margin: 0 }} />
                      <div className="tag-wrapper">
                        {
                          el.tagIds.map((el1, index) => {
                            return (
                              <a className="tag-btn"
                                key={index}
                                onClick={() => navigateTo(`/tags/${el1.split('.')[0]}`, { state: el1.split('.')[1] })}>
                                {el1.split('.')[1]}
                              </a>
                            )
                          })
                        }
                      </div>
                    </Card>
                  </li>
                )
              })}
            </ul>
            <InfiniteScroll loadMore={getArticleList} hasMore={hasMore} style={{ width: '100%' }} />
          </Col>
        </Row >
      </div >
    </div >
  )
}
