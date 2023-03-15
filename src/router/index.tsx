import React,{lazy} from "react";
import Home from "../pages/Home";
const withLoading=(com:JSX.Element)=>{
    <React.Suspense>
        {com}
    </React.Suspense>
}
const routes=[
    {
        path:'/',
        element:<Home/>
    }
]
export default routes
