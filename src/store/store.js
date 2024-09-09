import { configureStore, createReducer } from "@reduxjs/toolkit";
import hackathonReducers from "./reducers/hackathonReducers";

export const store = configureStore({
    reducer : {
        hackathons : hackathonReducers
    }
})