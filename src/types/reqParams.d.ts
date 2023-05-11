interface defaultListType<T, T1> {
    orderByFields?: T,
    pageNum: number,
    pageSize: number,
    queryParam: T1
}

type getMessageListParams = defaultListType<
    { createTime?: boolean },
    {
        auditType: number|null,
        messageContent?: string|null,
        messageId?: number
    }
>