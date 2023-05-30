import { Col, Row, Avatar, Divider, Card, Space } from 'antd';
import { DownOutlined, GithubFilled, LineChartOutlined, QqCircleFilled } from '@ant-design/icons'
import EasyTyper from "easy-typer-js";
import LazyLoad from 'react-lazyload';
import touxiangImg from '../../images/touxiang.png'
import './index.scss'
import { useEffect, useState } from 'react';
import Footer from '../../components/Layout/Footer';
import { getArticleListReq, getCategoryListReq, getTagListReq } from '../../requests/api';
import { FormatData } from '../../Hooks/formatData';
import MyIcon from '../../components/MyIcon';
import { InfiniteScroll } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [obj, setObj] = useState({
    output: "",
    isEnd: false,
    speed: 300,
    singleBack: false,
    sleep: 0,
    type: "rollback",
    backSpeed: 40,
    sentencePause: true
  })
  const [hasMore, setHasMore] = useState(true)//无限刷新是否还有更多
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<articleItemType[]>([])//无限刷新查询分类数据
  const navigateTo = useNavigate()
  const initArticleList = async (res: articleListRes) => {
    let articleListContext1: articleListRes = JSON.parse(JSON.stringify(res))
    let markdownIt = require('markdown-it')()
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
        el.articleContent = markdownIt.render(el.articleContent)
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
      }
    })
    if (res.code !== 200) return
    setCurrentPage(currentPage + 1)
    initArticleList(res)
    setHasMore(res.data.data.length > 0)
  }
  useEffect(() => {
    document.title = '首页'
    fetch("https://v1.hitokoto.cn?c=i")
      .then(res => {
        return res.json();
      })
      .then(({ hitokoto }) => {
        initTyped(hitokoto);
      });
  }, [])
  const initTyped = (input: string) => {
    const obj1 = obj;
    new EasyTyper(obj1, input, () => console.log('输出完毕'), (output: string) => {
      setObj(data => {
        return { ...data, output: output }
      })
    });

  }
  const scrollDown = () => {
    window.scrollTo({
      behavior: "smooth",
      top: document.documentElement.clientHeight
    });
  }
  return (
    <div className='home'>
      <div className="home-banner" >
        <div className="banner-container animated zoomIn">
          <h1 className="blog-title animated zoomIn">
            个人博客
          </h1>
          <div className="blog-intro">
            {obj.output} <span className="easy-typed-cursor">|</span>
          </div>
        </div>
        <div className="scroll-down" onClick={scrollDown}>
          <DownOutlined className="scroll-down-effects" />
        </div>
      </div>
      <Row className='content'>
        <Col span={15} push={2} >
          <Space className="aticle-list" direction="vertical" size="middle" style={{ display: 'flex' }}>
            {data.map(el => {
              return (
                <Card bordered={false} className="card animated zoomIn article-card" key={el.articleId} onClick={() => navigateTo(`/article/${el.articleId}`)} >
                  <LazyLoad
                    height='100%'
                  >
                    <img src={el.articleCoverUrl} alt="" />
                  </LazyLoad>
                  <div className="breif-intro">
                    <p className="breif-intro_title">{el.articleTitle}</p>
                    <div className='article-detail'>
                      <span className="article-detail_time"><MyIcon type='icon-rili' /><Space>{el.createTime} <span>|</span></Space></span>
                      <span className="article-detail_category"><MyIcon type='icon-category_fill' /> <Space>{el.categoryId} <span>|</span></Space></span>
                      <span className="article-detail_tags">
                        <MyIcon type='icon-tag-fill' />
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
                </Card>
              )
            })}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
          </Space>
        </Col>
        <Col span={4} push={3}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }} className='right-card'>
            <Card bordered={false} className='animated zoomIn '>
              <div className="author-wrapper">
                <Avatar size={110} src={touxiangImg} className="author-avatar" />

                <div style={{ fontSize: '1.375rem', marginTop: '0.625rem' }}>
                  网站作者
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  网站简介
                </div>
                <div className="blog-info-wrapper">
                  <div className="blog-info-data">
                    <div style={{ fontSize: "0.875em" }}>文章</div>
                    <div style={{ fontSize: "1.25em" }}>
                      1
                    </div>
                  </div>
                  <div className="blog-info-data">
                    <div style={{ fontSize: "0.875em" }}>分类</div>
                    <div style={{ fontSize: "1.25em" }}>
                      1
                    </div>
                  </div>
                  <div className="blog-info-data">
                    <div style={{ fontSize: "0.875em" }}>标签</div>
                    <div style={{ fontSize: "1.25em" }}>1</div>
                  </div>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <div className="card-info-social">
                  <QqCircleFilled className="mr-5" style={{ marginRight: '20px', fontSize: 24 }} />
                  <GithubFilled className="mr-5" style={{ fontSize: 24 }} />
                </div>
              </div>
            </Card>
            <Card bordered={false} className='animated zoomIn'>
              <div>
                <LineChartOutlined />
                网站资讯
              </div>
              <div className="web-info">
                <div style={{ padding: "4px 0 0" }}>
                  运行时间:<span className="float-right">1</span>
                </div>
                <div style={{ padding: "4px 0 0" }}>
                  总访问量:<span className="float-right">
                    10
                  </span>
                </div>
              </div>
            </Card>
          </Space>
        </Col>
      </Row>
      <Footer />
    </div>

  );
}

