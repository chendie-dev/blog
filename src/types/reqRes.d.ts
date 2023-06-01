interface defaultResType<T> {
    code: number,
    data: T,
    msg: string
    traceId: string
}
interface messageItemType {
    createTime: string,
    messageContent: string,
    messageId: number
}
interface tagItemType {
    tagId: string;
    tagName: string;
    createTime: string;
}
interface articleItemType {
    articleContent: string,
    articleCoverUrl: string,
    articleId: string,
    articleTitle: string,
    categoryId: string,
    createTime: string,
    rank: number,
    tagIds: string[]
}
interface categoryItemType {
    categoryId: string,
    categoryName: string,
    createTime: string
}
interface userItemType {
    avatarUrl: string,
    createTime: string,
    email: string,
    nickname: string,
    phoneNumber: string,
    roleName: string,
    sexEnum: string,
    userId: string,
    username: string
}
interface pageType {
    authorUrl: string,
    authorName: string,
    briefIntroduction: string,
    githubUrl: string,
    qqUrl: string,
    homePageUrl: string,
    messagePageUrl: string,
    categoryPageUrl: string,
    tagPageUrl: string,
    aboutMePageUrl: string
}
interface commentItemType {
    commentContent: string,
    commentId: string,
    createTime: string,
    userId: string,
    replyUserId: string,
    children: []
}
interface userInfoByIdType {
    avatarUrl: string,
    userId: string,
    username: string
}
interface newComentItemType{
    commentContent: string,
    commentId: string,
    createTime: string,
    userId: string,
    replyUserId: string,
    children: newComentItemType[]
    userInfo:userInfoByIdType|undefined,
    replyUserInfo:userInfoByIdType|undefined
}
type idRes = defaultResType<{ id: string }>
type messageListRes = defaultResType<{ data: messageItemType[], totalPage: number }>
type articleListRes = defaultResType<{ data: articleItemType[], totalPage: number }>
type tagListRes = defaultResType<{ data: tagItemType[], totalPage: number }>
type categoryListRes = defaultResType<{ data: categoryItemType[], totalPage: number }>
type commentListRes = defaultResType<{ data: newComentItemType[], totalPage: number }>
type logInRes = defaultResType<string>
type logOutRes = defaultResType<null>
type userRes = defaultResType<userItemType>
type booleanRes = defaultResType<boolean>
type aboutMeRes = defaultResType<string>
type userInfoByIdRes = defaultResType<userInfoByIdType>
type getPageRes = defaultResType<pageType>
