import { useEffect, useState } from 'react';
import BulletScreen, { StyledBullet } from 'rc-bullets';
import { addMessageReq, getMessageReq } from '../../requests/api';
import { message } from 'antd';
import './index.scss'
import { usePageContext } from '../../components/PageDataProvider';

export default function Message() {
    const [screen, setScreen] = useState<JSX.Element[]>([])
    const [bullet, setBullet] = useState<messageItemType[]>([]);
    const [isShow, setIsShow] = useState(0)
    const [messageVal, setMessageVal] = useState('')
    const pages=usePageContext()
    useEffect(() => {
        if (bullet) {
            bullet.forEach(el => {
                screen.push(
                    <StyledBullet
                        pauseOnHover={true}
                        msg={el.messageContent}
                        backgroundColor={'rgba(0, 0, 0, 0.3)'}
                        color={'white'}
                        
                    />
                )
            })
        }
    }, [bullet])
    useEffect(() => {
        let s = new BulletScreen('.screen', { duration: 10,loopCount:'infinite',animateTimeFun:'ease-in' });
        setScreen(s);
        getMessageList()
    }, [])
    //获取留言列表
    const getMessageList = async () => {
        let res = await getMessageReq({
            orderByFields: { createTime: false },
            pageNum: 1,
            pageSize: 100,
            queryParam: {
            }
        })
        if (res.code !== 200) return
        // console.log(res)
        setBullet(res.data.data)
    }
    const addMessage = async () => {
        if (messageVal.replace(/\s*/g, '').length === 0) {
            message.error('不能为空')
            return
        }
        let res = await addMessageReq({ messageContent: messageVal })
        if (res.code !== 200) return
        message.success('留言成功，审核中！')
        setMessageVal('')
    }
    return (
        <>
            <div className="homePage" style={{background: `url('${pages.messagePageUrl}') center center / cover no-repeat`}}>
                <div className="screen">
                </div>
            </div>
            <div className="message-container">
                <h1 className="message-title">留言板</h1>
                <div className="animated fadeInUp message-input-wrapper">
                    <input
                        placeholder="说点什么吧"
                        onFocus={() => setIsShow(1)}
                        value={messageVal}
                        onChange={(e) => setMessageVal(e.target.value)}
                        onKeyUp={(e) => e.keyCode === 13 ? addMessage() : ''}
                    />
                    <button
                        className="ml-3 animated bounceInLeft"
                        style={{ display: isShow === 1 ? 'block' : 'none' }}
                        onClick={() => addMessage()}
                    >
                        发送
                    </button>
                </div>
            </div>
        </>
    );
}
