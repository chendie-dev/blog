import React, { lazy } from "react";
import Home from "../pages/Home";
const Message = lazy(() => import('../pages/Message'))
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
    }
]
export default routes
