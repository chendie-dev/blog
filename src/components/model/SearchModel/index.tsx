import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../Hooks/storeHook'
import { handleStatus } from '../../../store/ModelStatusSlice'
import './index.scss'
import { getArticleListReq } from '../../../requests/api'
import { useNavigate } from 'react-router-dom'
interface childProps {
    open: boolean,
    onCancel: any,
}
const useThrottle = (fn: () => Promise<void>, wait: number) => {
    let timer = useRef<NodeJS.Timeout>()
    return () => {
        clearTimeout(timer.current)
        timer.current = setTimeout(fn, wait)
    }
}

const SearchModel: React.FC<childProps> = (props) => {

    const getArticleByAll = async (value: string) => {
        let res = await getArticleListReq({
            orderByFields: {},
            pageNum: 1,
            pageSize: 2,
            queryParam: {
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
                articleContent: value,
            }
        })
        return res.data.data
    }
    const [keyWord, setKeyWord] = useState<{ value: string, flag: boolean }>({ value: '', flag: true })
    const [articleList, setArticleList] = useState<articleItemType[]>([])
    const [loading, setLoading] = useState(true)
    const navigeteTo = useNavigate()
    const dispatch = useAppDispatch()
    const { status } = useAppSelector((state) => ({
        status: state.modelStatus.status
    }))
    useEffect(() => {
        setArticleList([]);
        setKeyWord({ value: '', flag: true });
    }, [status === 0])
    useEffect(() => {
        if (keyWord.value.replace(/\s*/g, "") !== '' && keyWord.flag) {
            setLoading(true)
            initArticle()
        } else {
            setArticleList([])
        }
    }, [keyWord])
    const initArticle = useThrottle(async () => {
        let newkeyWord = keyWord.value.replace(/\s*/g, "")
        let res = await getArticleByAll(newkeyWord)
        let res1 = await getArticleByTitle(newkeyWord)
        let res2 = await getArticleByContent(newkeyWord)
        let arr: articleItemType[] = []
        res.forEach(el => {
            if (!arr.find(el1 => el.articleId === el1.articleId)) arr.push(el)
        })
        res1.forEach(el => {
            if (!arr.find(el1 => el.articleId === el1.articleId)) arr.push(el)
        })
        res2.forEach(el => {
            if (!arr.find(el1 => el.articleId === el1.articleId)) arr.push(el)
        })
        arr.forEach(el => {
            filterKeyWord(el)
        })
        setArticleList(arr)
        setLoading(false)
    }, 1500)

    const filterKeyWord = (article: articleItemType) => {
        let re = new RegExp(keyWord.value, "g")
        let markdownIt = require('markdown-it')()
        article.articleTitle = article.articleTitle.replaceAll(re, `<span class="keyword">${keyWord.value}</span>`)
        article.articleContent = markdownIt.render(article.articleContent)
            .replace(/<\/?[^>]*>/g, "")
            .replace(/[|]*\n/, "")
            .replace(/&npsp;/gi, "");
        article.articleContent = article.articleContent.replaceAll(re, `<span class="keyword">${keyWord.value}</span>`)
    }
    return (
        <Modal {...props} footer={[]}>
            <div className="search-wrapper" style={{ borderRadius: "4px" }}>
                {/* <!-- 输入框 --> */}
                <div className="search-input-wrapper">
                    <SearchOutlined style={{ fontSize: '20px', color: '#666' }} />
                    <input v-model="keywords" placeholder="输入文章标题或内容..."
                        value={keyWord.value}
                        onCompositionStart={() => setKeyWord((last) => ({ ...last, flag: false }))}
                        onCompositionEnd={() => setKeyWord((last) => ({ ...last, flag: true }))}
                        onChange={(e) => setKeyWord((last) => ({ ...last, value: e.target.value }))}
                    />
                </div>
                <div className="search-result-wrapper">
                    <hr className="divider" />
                    <ul>
                        {
                            articleList.map(el => {
                                return (
                                    <li className="search-reslut" key={el.articleId} onClick={() => { navigeteTo(`/article/${el.articleId}`); dispatch(handleStatus({ status: 0 })) }} >
                                        <a dangerouslySetInnerHTML={{ __html: el.articleTitle }} />
                                        <p className="search-reslut-content " dangerouslySetInnerHTML={{ __html: el.articleContent }} />
                                    </li>
                                )
                            })

                        }
                    </ul>
                    {/* <!-- 搜索结果不存在提示 --> */}
                    {
                        !loading && keyWord.flag && articleList.length === 0 && keyWord.value.replace(/\s*/g, "").length > 0 ? <div style={{ fontSize: "0.875rem" }}>
                            找不到您查询的内容：{keyWord.value}
                        </div> : ''
                    }
                </div>
            </div>
        </Modal>
    )
}
export default SearchModel
