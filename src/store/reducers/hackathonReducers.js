import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hackathons: JSON.parse(localStorage.getItem('hackathons')) || []
}
const hackathonSlice = createSlice({

     name : "hackathons",
     initialState ,
     reducers : {
        addHackathons : (state , action)=>{
            state.hackathons.push(action.payload)
            localStorage.setItem('hackathons', JSON.stringify(state.hackathons));
        },
        updateHackathons : (state , action)=>{
            const index = state.hackathons.findIndex(hack => hack.id === action.payload.id)
            if(index !== -1){
                state.hackathons[index] = action.payload
                localStorage.setItem('hackathons', JSON.stringify(state.hackathons));
            }
        },
        deleteHackathons : (state , action)=>{
            state.hackathons = state.hackathons.filter(hack => hack.id !== action.payload)
            localStorage.setItem('hackathons', JSON.stringify(state.hackathons));
        }
     }  
})

export const {addHackathons , updateHackathons , deleteHackathons} = hackathonSlice.actions;
export default hackathonSlice.reducer;