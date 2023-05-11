import request from './index'
//获取留言
export const getMessageReq=(params:getMessageListParams):Promise<messageListRes>=>request.post('/sms/message/queryByPage',params)
//添加留言
export const addMessageReq=(params:{messageContent:string}):Promise<idRes>=>request.post('/sms/user/message/add',params)
