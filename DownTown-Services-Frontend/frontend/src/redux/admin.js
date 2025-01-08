import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    users:[],
    selectedUser:'',
    selectedWorker:'',
    workers:[],
    requests:[],
    selectedCategory:'',
    selectedSubCategory:'',
    selectedSubcategories:''
}

console.log(INITIAL_STATE.users);


const adminSlice = createSlice({
    name:'admin',
    initialState:INITIAL_STATE,
    reducers:{
        setUsers: (state, action)=>{
            state.users = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setSelectedWorker: (state, action) => {
            state.selectedWorker = action.payload;
        },
        setWorkers: (state, action)=>{
            state.workers = action.payload;
        },
        setRequests: (state, action)=>{
            state.requests = action.payload;
        },
        setSelectedCategory:(state, action)=>{
            state.selectedCategory = action.payload;
        },
        updateSelectedCategory:(state, action)=>{
            state.selectedCategory = {
                ...state.selectedCategory,
                subcategories:[
                    ...state.selectedCategory.subcategories,
                    action.payload
                ]
            };
        },
        editandUpdateselectedCategory:(state, action)=>{
            const updatedSubcategory = action.payload;
    
            state.selectedCategory = {
                ...state.selectedCategory,
                subcategories: state.selectedCategory.subcategories.map(subcategory => 
                    subcategory.id === updatedSubcategory.id ? updatedSubcategory : subcategory
                ),
            };
        },
        setselectedSubCategory:(state, action)=>{
            state.selectedSubCategory = (action.payload);
        },
        setSelectedSubcategories:(state, action)=>{
            state.selectedSubCategory = (action.payload);
        }
    }
})

export const {setUsers, setSelectedUser, setSelectedWorker, setWorkers, setRequests, setSelectedCategory, setselectedSubCategory, updateSelectedCategory, editandUpdateselectedCategory} = adminSlice.actions;
export default adminSlice.reducer;