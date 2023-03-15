import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface prop{
    status:number
}
const modelStatusSlice=createSlice({
    name:'modelStatus',
    initialState:{
        status:0
    },
    reducers:{
        handleStatus:(state,actions:PayloadAction<prop>)=>{
            state.status=actions.payload.status
        }
    }
})
export const {handleStatus}=modelStatusSlice.actions
export default modelStatusSlice.reducer