import { Col, Row, Avatar, Divider } from 'antd';
import { DownOutlined, LineChartOutlined } from '@ant-design/icons'
import EasyTyper from "easy-typer-js";
import Swiper from '../../components/Swiper';
import touxiangImg from '../../images/touxiang.png'
import './index.css'
import { useEffect, useState } from 'react';


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
      <main>
        <div className="home-banner " >
          <div className="banner-container">
            <h1 className="blog-title animated zoomIn">
              个人博客-陈蝶
            </h1>
            <div className="blog-intro">
              {obj.output} <span className="easy-typed-cursor">|</span>
            </div>
          </div>
          {/* <!-- 向下滚动 --> */}
          <div className="scroll-down" onClick={scrollDown}>
            <DownOutlined  className="scroll-down-effects" />
          </div>
        </div>
        <Row className="home-container">
          <Col span={17} >
            <div className="animated zoomIn card" >
              <Swiper></Swiper>
            </div>
            <div className="card animated zoomIn article-card" >
            </div>
          </Col>
          <Col span={6} push={1}>

            <div className="card animated zoomIn blog-card mt-5">
              <div className="author-wrapper">
                {/* <!-- 博主头像 --> */}
                <Avatar size={110} src={touxiangImg} className="author-avatar" />

                <div style={{ fontSize: '1.375rem', marginTop: '0.625rem' }}>
                  网站作者
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  网站简介
                </div>
                {/* <!-- 博客信息 --> */}
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
                {/* <!-- 社交信息 --> */}
                <div className="card-info-social">
                  <a
                    className="mr-5 iconfont iconqq"
                    target="_blank"
                    href=""
                    style={{ display: 'inline-block', marginRight: '20px' }}
                  />
                  <a
                    target="_blank"
                    href=""
                    className="mr-5 iconfont icongithub"
                  />

                </div>
               
              </div>
            </div>
            <div className="card blog-card animated zoomIn mt-5">
                  <div className="web-info-title">
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
                </div>
          </Col>
        </Row>
      </main>
    </>

  );
}

