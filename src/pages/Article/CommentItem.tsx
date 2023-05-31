import { MessageOutlined } from '@ant-design/icons'
import { Avatar, Button, InputRef, Space, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import './index.scss'
import { memo, useEffect, useRef, useState } from 'react'
import { addCommentReq, deleteCommentReq } from '../../requests/api'
import { useUserData } from '../../components/UserDataProvider'
import { handleStatus } from '../../store/ModelStatusSlice'
import { useAppDispatch } from '../../Hooks/storeHook'
interface propsType {
    commentItem: newComentItemType,
    articleId: string,
    parentId: string,
    getCommentList: ()=>Promise<void>
}
const CommentItem: React.FC<propsType> = memo(({ commentItem, articleId, parentId, getCommentList }) => {
    const [isShow, setIsShow] = useState(false)
    const inputRef = useRef<InputRef>(null);
    const [textVal, setTextVal] = useState('')
    const userData = useUserData()
    const dispatch=useAppDispatch()
    useEffect(() => {
        if (isShow) inputRef.current?.focus()
    }, [isShow])
    const subReply = async () => {
        if (!userData.userId) {
            dispatch(handleStatus({ status: 2 }))
            return
        }
        let res = await addCommentReq({
            articleId: articleId,
            parentId: parentId,
            replyUserId: commentItem.userId,
            commentContent: textVal
        })
        if (res.code !== 200) {
            message.error(res.msg)
            return
        }
        message.success('回复成功，审核中！')
        setTextVal('')
    }
    const deleteComment = async () => {
        let res = await deleteCommentReq([commentItem.commentId])
        if (res.code !== 200) {
            message.error(res.msg)
            return
        }
        message.success('删除成功')
        getCommentList()

    }
    return (
        <div className='comment-item'>
            <div className="comment-parent_top">
                <Space>
                    <Avatar src={commentItem.userInfo?.avatarUrl} style={{ display: 'inline-block' }} />
                    <span>{commentItem.userInfo?.username}</span>
                    <span>{commentItem.createTime}</span>
                    <span className='opt' style={{ display: isShow ? 'inline-block' : '' }}>
                        <Space>
                            <span style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => setIsShow((last) => !last)}><MessageOutlined style={{ marginRight: 2 }} />{isShow ? '收起' : '回复'}</span>
                            <span onClick={() => deleteComment()} style={{ fontSize: 12, cursor: 'pointer', display:userData.userId!==commentItem.userId?'none':'inline-block' }}>删除</span>
                            
                        </Space>
                    </span>
                </Space>
            </div>
            <div className="comment-parent_content">
                <p>{commentItem.replyUserId ? <a href="">@{commentItem.replyUserInfo?.username}</a> : ''} {commentItem.commentContent}</p>
                <div className="reply" style={{ display: isShow ? 'block' : 'none' }}>
                    <TextArea placeholder={'@' + commentItem.userInfo?.username} autoSize ref={inputRef} value={textVal} style={{ width: '89%', marginRight: 9 }} allowClear onChange={(e) => setTextVal(e.target.value)} />
                    <Button type="primary" onClick={() => subReply()} >回复</Button>
                </div>
            </div>
        </div>
    )
}
)
export default CommentItem
