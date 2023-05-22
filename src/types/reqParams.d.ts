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
type getTagListParams = defaultListType<
    {
        createTime?: boolean
    },
    {
        isDelete: boolean,
        tagId?: string|null,
        tagName?: string
    }
>
type getCategoryListParams = defaultListType<
    {
        createTime?: boolean
    },
    {
        isDelete: boolean
        categoryId?: string|null,
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
        isDelete: boolean,
        tagIds?: string[] | null
        articleStatus?:number|null
    }
>
interface registerParams{
    captcha:string ,
    email: string,
    password:string ,
    rePassword:string ,
    username: string
  }
  