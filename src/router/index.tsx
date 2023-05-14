import React, { lazy } from "react";
import Home from "../pages/Home";
const Message = lazy(() => import('../pages/Message'))
const Archives = lazy(() => import('../pages/Archives'))
const Article=lazy(()=>import('../pages/Article'))
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
    }
]
export default routes
