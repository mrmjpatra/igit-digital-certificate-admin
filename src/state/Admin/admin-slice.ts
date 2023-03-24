import { createSlice } from "@reduxjs/toolkit";

type stateType = {
    adminType: string,
    isLoggedIn: boolean
}

const initialState: stateType = {
    adminType: '',
    isLoggedIn: false
}

const adminSlice = createSlice({
    name: 'Admin',
    initialState:()=>{
            const adminType=localStorage.getItem('adminType');
            const isLoggedIn=localStorage.getItem('isLoggedIn');
            if (adminType===null) {
                return initialState;
            }
            return {
                adminType,
                isLoggedIn
            }
    },
    reducers: {
        adminLoggedIn: (state, action) => {
            state.adminType=action.payload;
            state.isLoggedIn=true;
            localStorage.setItem('adminType',action.payload);
            localStorage.setItem('isLoggedIn',"true");
        },
        removeAdminLogin:(state)=>{
            localStorage.clear();
            localStorage.setItem('isLoggedIn',"false");
        }
    }

});
export const adminReducer=adminSlice.reducer;
export const {adminLoggedIn,removeAdminLogin}=adminSlice.actions;


