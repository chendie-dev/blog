import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../Hooks/storeHook'
import { handleStatus } from '../../../store/ModelStatusSlice'
import './index.scss'
import { getArticleListReq, getCategoryListReq, getTagListReq } from '../../../requests/api'
import { useNavigate } from 'react-router-dom'
interface childProps {
    open: boolean,
    onCancel: any
}
const SearchModel: React.FC<childProps> = (props) => {


    const getArticleByAll = async (value: string) => {
        let res = await getArticleListReq({
            orderByFields: {},
            pageNum: 1,
            pageSize: 2,
            queryParam: {
                isDelete: false,
                articleContent: value,
                articleTitle: value
            }
        })
        return res.data.data
    }
    const getArticleByTitle = async (value: string) => {
        let res = await getArticleListReq({
            orderByFields: {},
            pageNum: 1,
            pageSize: 2,
            queryParam: {
                isDelete: false,
                articleTitle: value
            }
        })
        return res.data.data
    }
    const getArticleByContent = async (value: string) => {
        let res = await getArticleListReq({
            orderByFields: {},
            pageNum: 1,
            pageSize: 2,
            queryParam: {
                isDelete: false,
                articleContent: value,
            }
        })
        return res.data.data
    }
    const [keyWord, setKeyWord] = useState('')
    const [articleList, setArticleList] = useState<articleItemType[]>([])
    const navigeteTo=useNavigate()
    const dispatch=useAppDispatch()
    useEffect(() => {
        if (keyWord.replace(/\s*/g, "") !== '') {
            initArticle()
        } else {
            setArticleList([])
        }
    }, [keyWord])
    const initArticle = async () => {
        let newkeyWord = keyWord.replace(/\s*/g, "")
        let res = await getArticleByAll(newkeyWord)
        let res1 = await getArticleByTitle(newkeyWord)
        let res2 = await getArticleByContent(newkeyWord)
        let arr:articleItemType[]=[]
        res.forEach(el=>{
            if(!arr.find(el1=>el.articleId===el1.articleId))arr.push(el)
        })
        res1.forEach(el=>{
            if(!arr.find(el1=>el.articleId===el1.articleId))arr.push(el)
        })
        res2.forEach(el=>{
            if(!arr.find(el1=>el.articleId===el1.articleId))arr.push(el)
        })
        arr.forEach(el => {
            filterKeyWord(el)
        })
        setArticleList(arr)
    }
    const filterKeyWord = (article: articleItemType) => {
        let re = new RegExp(keyWord, "g")
        let markdownIt = require('markdown-it')()
        article.articleTitle = article.articleTitle.replaceAll(re, `<span class="keyword">${keyWord}</span>`)
        article.articleContent = markdownIt.render(article.articleContent)
            .replace(/<\/?[^>]*>/g, "")
            .replace(/[|]*\n/, "")
            .replace(/&npsp;/gi, "");
        article.articleContent = article.articleContent.replaceAll(re, `<span class="keyword">${keyWord}</span>`)
    }
    return (
        <Modal {...props} footer={[]}>
            <div className="search-wrapper" style={{ borderRadius: "4px" }}>
                {/* <!-- 输入框 --> */}
                <div className="search-input-wrapper">
                    <SearchOutlined style={{ fontSize: '20px', color: '#666' }} />
                    <input v-model="keywords" placeholder="输入文章标题或内容..." value={keyWord} onChange={(e) => setKeyWord(e.target.value)} />
                </div>
                <div className="search-result-wrapper">
                    <hr className="divider" />
                    <ul>
                        {
                            articleList.map(el => {
                                return (
                                    <li className="search-reslut" key={el.articleId}  onClick={()=>{navigeteTo(`/article/${el.articleId}`);setArticleList([]);dispatch(handleStatus({status:0}))}} >
                                        <a dangerouslySetInnerHTML={{ __html: el.articleTitle }} />
                                        <p className="search-reslut-content " dangerouslySetInnerHTML={{ __html: el.articleContent }} />
                                    </li>
                                )
                            })

                        }
                    </ul>
                    {/* <!-- 搜索结果不存在提示 --> */}
                    {
                        articleList.length === 0&&keyWord.replace(/\s*/g, "").length>0 ? <div style={{ fontSize: "0.875rem" }}>
                            找不到您查询的内容：{keyWord}
                        </div> : ''
                    }
                </div>
            </div>
        </Modal>
    )
}
export default SearchModel
