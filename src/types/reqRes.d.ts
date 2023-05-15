interface defaultResType<T> {
    code: number,
    data: T,
    msg: string
    traceId: string
}
interface messageItemType {
    auditType: number,
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
    articleId:string ,
    articleStatus:number ,
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
type idRes = defaultResType<{ id: string }>
type messageListRes = defaultResType<{ data: messageItemType[], totalPage: number }>
type articleListRes = defaultResType<{data:articleItemType[], totalPage: number }>
type tagListRes = defaultResType<{ data: tagItemType[], totalPage: number }>
type categoryListRes = defaultResType<{ data: categoryItemType[], totalPage: number }>
type logInRes = defaultResType<string>
type logOutRes=defaultResType<null>