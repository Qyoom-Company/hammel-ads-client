import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
        },
    },
});

export const { saveUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
