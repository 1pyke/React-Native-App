import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersonState, ProfileProps } from "../../interfaces/Profile";

const initalState:PersonState ={
    isLogedIn:false,
    personData :{},
}

export const presonSlice= createSlice({
    name:'persons',
        initialState:initalState,
        reducers:{
            userData(state,action:PayloadAction<ProfileProps>){
                const prevState = state.personData
                state.personData = {...prevState,...action.payload}
            }
        }
})

export default presonSlice.reducer

export const {userData} = presonSlice.actions