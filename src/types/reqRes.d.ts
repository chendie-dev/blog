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
type idRes = defaultResType<{ id: string }>
type messageListRes = defaultResType<{ data: messageItemType[], totalPage: number }>
