import { useLayoutEffect, useState } from 'react'
import './index.scss'
import { Button, Card, Col, Input, Row, Space, message } from 'antd'
import { useLocation } from 'react-router-dom'
import { addCommentReq, getArticleListReq, getCategoryListReq, getCommentListReq, getTagListReq, getUserInfoByIdReq } from '../../requests/api'
import { FormatData } from '../../Hooks/formatData'
import { MdCatalog, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import Footer from '../../components/Layout/Footer'
import MyIcon from '../../components/MyIcon'
import { MenuOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import CommentItem from './CommentItem'
import { useUserData } from '../../components/UserDataProvider'
import { useAppDispatch } from '../../Hooks/storeHook'
import { handleStatus } from '../../store/ModelStatusSlice'
const scrollElement = document.documentElement;
export default function Article() {
    const location = useLocation()
    const [data, setData] = useState<articleItemType>({} as articleItemType)
    const [commentList, setCommentList] = useState<newComentItemType[]>([])
    const [comment, setComment] = useState('')
    const userData = useUserData()
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        getArticle()
        getCommentList()
    }, [location.pathname.split('/')[2]])
    const getArticle = async () => {
        let res = await getArticleListReq({
            orderByFields: {},
            pageNum: 1,
            pageSize: 1,
            queryParam: {
                articleId: location.pathname.split('/')[2],
            }
        })
        if (res.code !== 200) return
        // console.log(res)
        initArticleList(res)
    }
    const getCommentList = async () => {
        let res = await getCommentListReq({
            orderByFields: {},
            pageNum: 1,
            pageSize: 100,
            queryParam: {
                articleId: location.pathname.split('/')[2]
            }
        })
        //set过滤userId
        let set = new Set<string>()
        function filterId(comments: newComentItemType[]) {
            comments.forEach(el => {
                set.add(el.userId)
                if (el.children?.length > 0) filterId(el.children)
            })
            return
        }
        filterId(res.data.data)
        let ids = Array.from(set)
        //new Promise请求
        let usersInfo = await Promise.all(
            ids.map(el => {
                return getUserInfoByIdReq(el)
            })
        )
        let userInfoList=usersInfo.map(el=>el.data)
        //递归合成最终的comments（处理时间、用户信息）
        // console.log(res.data.data, 'comment')
        setCommentList(initCommentList(res.data.data,userInfoList))
    }
    const initCommentList=(comments:newComentItemType[],userInfos:userInfoByIdType[]):newComentItemType[]=>{
        let newCommentList:newComentItemType[]=[]
        comments.forEach(el=>{
            let obj:newComentItemType={
                ...el,
                userInfo:{} as userInfoByIdType
            }
            obj.userInfo=userInfos.find(el1=>el1.userId===el.userId)
            if(el.replyUserId)obj.replyUserInfo=userInfos.find(el1=>el1.userId===el.replyUserId)
            if(el.children?.length>0)obj.children=initCommentList(el.children,userInfos)
            obj.createTime=FormatData(el.createTime)
            newCommentList.push(obj)
        })
        return newCommentList
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
                    el.tagIds[i] = res1[i].data.data[0].tagName;
                }
                let res2 = await getCategoryListReq({
                    orderByFields: {},
                    pageNum: 1,
                    pageSize: 1,
                    queryParam: {
                        categoryId: el.categoryId,
                    }
                });
                el.categoryId = res2.data.data[0].categoryName
                el.createTime = FormatData(el.createTime);
                return el
            })
        )
        setData(articleList[0])
        // console.log('set')

    }
    const subComment = async () => {
        if (!userData.userId) {
            dispatch(handleStatus({ status: 2 }))
            return
        }
        let res = await addCommentReq({
            articleId: location.pathname.split('/')[2],
            parentId: null,
            replyUserId: null,
            commentContent: comment
        })
        if (res.code !== 200) {
            message.error(res.msg)
            return
        }
        message.success('评论成功，审核中！')
        setComment('')
    }
    const [id] = useState('preview-only');
    if (JSON.stringify(data) === "{}") return (<></>)
    else {
        return (
            <div className='article' >
                <div className="banner animated zoomIn" style={{ background: `url(${data.articleCoverUrl}) center center / cover no-repeat` }} >
                    <div className="banner-detail">
                        <div className="line">
                            <h1 className="banner-title">{data.articleTitle}</h1>
                        </div>
                        <div className="line">
                            <Space  >
                                <MyIcon type='icon-rili' />
                                <span className="time"> 发表于{data.createTime}</span>
                                <span>|</span>
                                <MyIcon type='icon-category_fill' />
                                <span>{data.categoryId}</span>
                            </Space>
                        </div>
                        <div className="line">
                            <Space >
                                <MyIcon type='icon-tag-fill' />
                                {
                                    data.tagIds.map((el1, index) => {
                                        return (
                                            <span key={index}>{el1}</span>
                                        )
                                    })
                                }
                            </Space>
                        </div>
                    </div>
                </div>
                <Row className='content'>
                    <Col span={15} push={2}>
                        <Card bordered={false} className='animated zoomIn'>
                            <MdPreview modelValue={data.articleContent} editorId={id} />
                        </Card>
                    </Col>
                    <Col span={4} push={3}>
                        <Card bordered={false} className='fixed-card animated zoomIn'>
                            <div className="right-title">
                                <MenuOutlined />
                                <span style={{ marginLeft: "10px", fontWeight: 'bolder' }}>目录</span>
                            </div>
                            <MdCatalog editorId={id} scrollElement={scrollElement} className='catalog' scrollElementOffsetTop={84} offsetTop={104} />
                        </Card>
                    </Col>
                </Row>
                <Row className='content comment'>
                    <Col span={15} push={2}>
                        <Card bordered={false} className='animated zoomIn'>
                            <div className="comment-input">
                                <TextArea placeholder="请发表友善言论" autoSize bordered={false} onChange={(e) => setComment(e.target.value)} value={comment} />
                                <Button onClick={() => subComment()} type='primary' style={{ position: 'absolute', marginTop: '10px', bottom: 10, right: 10 }}>发表评论</Button>
                            </div>
                            <div className="comment-info">
                                <div className="comment-parent">
                                    {
                                        commentList.map((el) => {
                                            return (
                                                <div key={el.commentId}>
                                                    <CommentItem getCommentList={() => getCommentList()} commentItem={el} parentId={el.commentId} articleId={location.pathname.split('/')[2]} />
                                                    {
                                                        el.children ? (
                                                            <div className="children">
                                                                {
                                                                    el.children.map((el1) => {
                                                                        return (
                                                                            <CommentItem getCommentList={() => getCommentList()} parentId={el.commentId} commentItem={el1} key={el1.commentId} articleId={location.pathname.split('/')[2]} />
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        ) : ''
                                                    }
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Footer />
            </div >
        )
    }
}
