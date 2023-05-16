import React, { lazy } from "react";
import Home from "../pages/Home";
const Message = lazy(() => import('../pages/Message'))
const Archives = lazy(() => import('../pages/Archives'))
const Article=lazy(()=>import('../pages/Article'))
const About=lazy(()=>import('../pages/About'))
const Categories=lazy(()=>import('../pages/Categories'))
const Tags=lazy(()=>import('../pages/Tags'))
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
]
export default routes
