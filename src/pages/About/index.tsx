import { Card, Col, Row, message } from 'antd'
import './index.scss'
import { MdPreview } from 'md-editor-rt'
import { useEffect, useState } from 'react';
import { aboutMeReq } from '../../requests/api';
import { usePageContext } from '../../components/PageDataProvider';
export default function About() {
    const [id] = useState('about');
    const [content,setContent]=useState('')
    const pages=usePageContext()

    const getAboutMe=async ()=>{
        let res=await aboutMeReq()
        if(res.code!==200){
            message.error(res.msg)
            return
        }
        setContent(res.data)
    }
    useEffect(()=>{
        getAboutMe()
    },[])
    return (
        <div className='about'>
            
            <div className="banner" style={{ background: `url(${pages.aboutMePageUrl}) center center / cover no-repeat` }}  >
                <div className="banner-detail">
                    <h1 className="banner-title">关于我</h1>
                </div>
            </div>
            <Row className='content'>
                <Col span={19} push={2}>
                    <Card bordered={false}>
                    <MdPreview modelValue={content} editorId={id} />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
