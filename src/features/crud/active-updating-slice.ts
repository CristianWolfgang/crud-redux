import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const ActiveUpdatingSlice = createSlice({
    name: "activeUpdatingSlice",
    initialState: {
        id:""
    },
    reducers: {
        toggleUpdate:(state,action:PayloadAction<string>):void=>{
            if(action){
                state.id=action.payload;
            }else{
                state.id="";
            }
        }
    }
});
export const {toggleUpdate} = ActiveUpdatingSlice.actions;
export default ActiveUpdatingSlice.reducer