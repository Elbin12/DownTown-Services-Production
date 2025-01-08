import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    workerinfo:'',
    selectedService:''
}

console.log(INITIAL_STATE.workerinfo);


const workerSlice = createSlice({
    name:'worker',
    initialState:INITIAL_STATE,
    reducers:{
        setWorkerinfo: (state, action)=>{
            state.workerinfo = action.payload;
        },
        setSelectedService: (state, action)=>{
            state.selectedService = action.payload;
        }
    }
})

export const {setWorkerinfo, setSelectedService} = workerSlice.actions;
export default workerSlice.reducer;