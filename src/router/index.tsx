import React, { lazy } from "react";
import Home from "../pages/Home";
const Message = lazy(() => import('../pages/Message'))
const Article=lazy(()=>import('../pages/Article/Article'))
const About=lazy(()=>import('../pages/About'))
const Categories=lazy(()=>import('../pages/Categories'))
const Tags=lazy(()=>import('../pages/Tags'))
const ArticleList=lazy(()=>import('../pages/Article/ArticleList'))
const withLoading = (com: JSX.Element) => (
    <React.Suspense>
        {com}
    </React.Suspense>
)
const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/message',
        element: withLoading(<Message />)
    }, 
    // {
    //     path:'/archives',
    //     element:withLoading(<Archives/>)
    // }
    {
        path:'/article/:id',
        element:withLoading(<Article/>)
    },
    {
        path:'/about',
        element:withLoading(<About/>)
    },
    {
        path:'/categories',
        element:withLoading(<Categories/>)
    },
    {
        path:'/tags',
        element:withLoading(<Tags/>)
    },
    {
        path:'/categories/:id',
        element:withLoading(<ArticleList/>)
    },
    {
        path:'/tags/:id',
        element:withLoading(<ArticleList/>)
    },
]
export default routes
