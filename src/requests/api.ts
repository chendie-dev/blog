import request from './index'
//获取留言
export const getMessageReq=(params:getMessageListParams):Promise<messageListRes>=>request.post('/sms/message/queryByPage',params)
//添加留言
export const addMessageReq=(params:{messageContent:string}):Promise<idRes>=>request.post('/sms/user/message/add',params)
//获取标签分页
export const getTagListReq = (params: getTagListParams): Promise<tagListRes> => request.post('/article/admin/tag/queryByPage', params)
//获取分类分页
export const getCategoryListReq = (params: getCategoryListParams): Promise<categoryListRes> => request.post('/article/admin/category/queryByPage', params)
//获取文章
export const getArticleListReq=(params:getArticleListParams):Promise<articleListRes>=>request.post('/article/body/queryByPage',params)
//登入
export const loginReq=(params:{password:string ,username:string }):Promise<logInRes>=>request.post('/auth/login',params)
//登出
export const logoutReq=():Promise<logOutRes>=>request.post('/auth/logout')
//注册
export const registerReq=(params:registerParams):Promise<idRes>=>request.post('/auth/register',params)
//获取验证码
export const getCaptchaReq=(params:{mail:string})=>request.post('/sms/captcha/send',params)
//获取用户信息
export const getUserReq = (): Promise<userRes> => request.post('/auth/getUserInfo')
//更新用户信息
export const updateUserInfoReq = (params: userInfoParams): Promise<idRes> => request.post('/auth/updateUserInfo', params)
//更新邮箱
export const updateEmailReq=(params:emailInfoParams): Promise<idRes> => request.post('/auth/updateEmail',params)
//更新密码
export const updatePasswordReq=(params:passwordInfoParams): Promise<idRes> => request.post('/auth/updatePassword',params)
//判断邮箱是否合法
export const checkEmailReq=(email:string):Promise<booleanRes>=>request.get(`/auth/checkEmail?email=${email}`)
//判断用户名是否合法
export const checkUsernameReq=(username:string):Promise<booleanRes>=>request.get(`/auth/checkUsername?username=${username}`)
