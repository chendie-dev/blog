import { Col, Row, Avatar, Divider, Card, Space } from 'antd';
import { DownOutlined, GithubFilled, LineChartOutlined, QqCircleFilled } from '@ant-design/icons'
import EasyTyper from "easy-typer-js";
import touxiangImg from '../../images/touxiang.png'
import './index.scss'
import { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import Footer from '../../components/Layout/Footer';


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
    <>
      <main className='home'>
        <div className="home-banner " >
          <div className="banner-container animated zoomIn">
            <h1 className="blog-title animated zoomIn">
              个人博客
            </h1>
            <div className="blog-intro">
              {obj.output} <span className="easy-typed-cursor">|</span>
            </div>
          </div>
          {/* <!-- 向下滚动 --> */}
          <div className="scroll-down" onClick={scrollDown}>
            <DownOutlined className="scroll-down-effects" />
          </div>
        </div>
        <Row className='content'>
          <Col span={15} push={2} >
            <ArticleList />
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
                    {/* <a
                      className="mr-5 iconfont iconqq"
                      target="_blank"
                      href=""
                      style={{ display: 'inline-block', marginRight: '20px' }}
                    /> */}
                    <QqCircleFilled className="mr-5" style={{marginRight: '20px',fontSize:24}} />
                    <GithubFilled className="mr-5" style={{fontSize:24}}/>
                    {/* <a
                      target="_blank"
                      href=""
                      className="mr-5 iconfont icongithub"
                    /> */}
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
      </main>
      <Footer />
    </>

  );
}

