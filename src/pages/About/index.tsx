import { Card, Col, Row } from 'antd'
import Footer from '../../components/Layout/Footer'
import './index.scss'
export default function About() {
    return (
        <div className='about'>
            {/* style={{ background: `url(${data.articleCoverUrl}) center center / cover no-repeat` }} */}
            <div className="banner"   >
                <div className="article-detail">
                    <h1 className="article-title">关于我</h1>
                </div>
            </div>
            <Row className='content'>
                <Col span={19} push={2}>
                    <Card bordered={false}></Card>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
}
