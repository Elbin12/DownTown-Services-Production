import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    locationDetails: {
        location:'',
        lat:'',
        lng:''
    }
}

const anonymousUserSlice = createSlice({
    name:'anonymoususer',
    initialState:INITIAL_STATE,
    reducers:{
        setLocationDetails: (state, action)=>{
            state.locationDetails = action.payload;
        }
    }
})

export const {setLocationDetails} = anonymousUserSlice.actions;
export default anonymousUserSlice.reducer;