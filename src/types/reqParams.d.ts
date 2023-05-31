interface defaultListType<T, T1> {
    orderByFields?: T,
    pageNum: number,
    pageSize: number,
    queryParam: T1
}
interface addCommentParams {
    articleId: string,
    commentContent: string,
    parentId?: string | null,
    replyUserId?: string | null
}
type getMessageListParams = defaultListType<
    { createTime?: boolean },
    {
        messageContent?: string | null,
        messageId?: number
    }
>
type getTagListParams = defaultListType<
    {
        createTime?: boolean
    },
    {
        tagId?: string | null,
        tagName?: string
    }
>
type getCategoryListParams = defaultListType<
    {
        createTime?: boolean
    },
    {
        categoryId?: string | null,
        categoryName?: string,
    }
>
type getArticleListParams = defaultListType<
    { createTime?: boolean },
    {
        articleContent?: string | null,
        articleId?: string | null,
        articleTitle?: string | null,
        categoryId?: string | null,
        tagIds?: string[] | null
    }
>
type getCommentListParams = defaultListType<
    { createTime?: boolean },
    {
        articleId: string
    }
>
interface registerParams {
    captcha: string,
    email: string,
    password: string,
    rePassword: string,
    username: string
}
interface emailInfoParams {
    captcha: string,
    currentPassword: string,
    email: string,
    userId: string
}
interface userInfoParams {
    avatarUrl?: string,
    nickname?: string,
    phoneNumber?: string,
    sex?: string,
    userId: string,
    username?: string
}
interface passwordInfoParams {
    currentPassword: string,
    password: string,
    rePassword: string,
    userId: string
}  