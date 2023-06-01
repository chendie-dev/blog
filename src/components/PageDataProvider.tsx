import React, { Dispatch, createContext, useContext, useReducer } from 'react'
import { getPagesReq } from '../requests/api'
interface actionType {
    type: string
}
interface dataType {
    type: string,
    payload: pageType
}
const PageContext = createContext<pageType>({} as pageType)
const PageDistPatchContext = createContext<Dispatch<actionType>>({} as Dispatch<actionType>)
const PageDataProvider: React.FC<propsType> = ({ children }) => {
    const [pageData, dispatch] = useReducer(pageReducer, {
        authorUrl: '',
        authorName: '',
        briefIntroduction: '',
        githubUrl: '',
        qqUrl: '',
        homePageUrl: '',
        messagePageUrl: '',
        categoryPageUrl: '',
        tagPageUrl: '',
        aboutMePageUrl: ''
    })
    function pageReducer(pageData: pageType, action: dataType) {
        switch (action.type) {
            case 'getdata': {
                return action.payload
            }
            default: {
                return pageData
            }
        }
    }
    return (
        <PageContext.Provider value={pageData}>
            <PageDistPatchContext.Provider value={dispatchMiddleware(dispatch)}>
                {children}
            </PageDistPatchContext.Provider>
        </PageContext.Provider>
    )
}
export default PageDataProvider
 export function usePageContext(){
    return useContext(PageContext)
}
export function usePageDispatch(){
    return useContext(PageDistPatchContext)
}
function dispatchMiddleware(next: Dispatch<dataType>) {
    return async (action: actionType) => {
        switch (action.type) {
            case 'getpage': {
                let res = await getPagesReq()
                next({
                    type: 'getdata',
                    payload: res.data
                })
            }
        }
    }
}

