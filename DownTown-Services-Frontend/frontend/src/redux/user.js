import { createSlice } from "@reduxjs/toolkit";




const INITIAL_STATE = {
    userinfo:'',
    search_key:''
}

// first_name:'',
//         last_name:'',
//         email:'',
//         dob:'',
//         gender:'',
//         profile_pic:'',
//         isActive:false,
//         isAdmin:false,

console.log(INITIAL_STATE.userinfo, 'hiiiii');


const userSlice = createSlice({
    name:'user',
    initialState:INITIAL_STATE,
    reducers:{
        setUserinfo: (state, action)=>{
            state.userinfo = action.payload;
        },
        setSearch_key: (state, action)=>{
            state.search_key = action.payload;
        }
    }
})

export const {setUserinfo, setSearch_key} = userSlice.actions;
export default userSlice.reducer;