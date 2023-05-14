import React, { useState } from 'react'
import { InfiniteScroll } from 'antd-mobile';
import './index.scss'
import { useArticleListData, useArticleListDataDispatch } from '../../components/Context/ArticleListDateProvider';
import { getArticleListReq, getCategoryListReq, getTagListReq } from '../../requests/api';
import { FormatData } from '../../Hooks/formatData';
import ToHtml from '../../Hooks/toHTML';
import { useNavigate } from 'react-router-dom';
export default function ArticleList() {
    const [hasMore, setHasMore] = useState(true)//无限刷新是否还有更多
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState<articleItemType[]>([])//无限刷新查询分类数据
    const navigateTo=useNavigate()
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
                                isDelete: false,
                                tagId: el1,
                            }
                        });
                    })
                );
                for (let i = 0; i < res1.length; i++) {
                    el.tagIds[i] = res1[i].data.data[0].tagName;
                }
                let res2 = await getCategoryListReq({
                    orderByFields: {},
                    pageNum: 1,
                    pageSize: 1,
                    queryParam: {
                        isDelete: false,
                        categoryId: el.categoryId,
                    }
                });
                el.categoryId = res2.data.data[0].categoryName
                el.createTime = FormatData(el.createTime);
                el.articleContent = ToHtml(el.articleContent)
                    .replace(/<\/?[^>]*>/g, "")
                    .replace(/[|]*\n/, "")
                    .replace(/&npsp;/gi, "");
                return el
            })
        )
        setData(val => [...val, ...articleList])
    }
    //无限刷新分类
    const loadMore = async () => {
        let res = await getArticleListReq({
            orderByFields: { createTime: false },
            pageNum: currentPage,
            pageSize: 10,
            queryParam: {
                isDelete: false,
                articleStatus: 1
            }
        })
        if (res.code !== 200) return
        setCurrentPage(currentPage + 1)
        initArticleList(res)
        setHasMore(res.data.data.length > 0)
    }
    return (
        <>
            <div className="aticle-list">
                {data.map(el => {
                    return (
                        <div className="card animated zoomIn article-card" key={el.articleId} onClick={()=>navigateTo(`/article/${el.articleId}`)} >
                            <img src={el.articleCoverUrl} alt="" />
                            <div className="breif-intro">
                                <p className="breif-intro_title">{el.articleTitle}</p>
                                <div className='article-detail'>
                                    <span className="article-detail_time">{el.createTime}</span>
                                    <span className="article-detail_category">{el.categoryId}</span>
                                    <span className="article-detail_tags">
                                        {el.tagIds.map((el1, key) => {
                                            return (
                                                <span key={key}>{el1}</span>
                                            )
                                        })}
                                    </span>
                                </div>
                                <div className="breif-intro_article-content" dangerouslySetInnerHTML={{ __html: el.articleContent }}>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </div>
        </>
    )
}
