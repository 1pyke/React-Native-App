import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PersonState{
    isLogedIn:boolean;
}

const initalState:PersonState ={
    isLogedIn:false,

}

export const presonSlice= createSlice({
    name:'persons',
        initialState:initalState,
        reducers:{
            logIn(state,action:PayloadAction<{isLogedIn:boolean}>){
                state.isLogedIn = action.payload.isLogedIn
            }
        }
})

export default presonSlice.reducer

export const {logIn} = presonSlice.actions