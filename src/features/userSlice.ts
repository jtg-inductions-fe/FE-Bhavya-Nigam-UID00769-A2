import type { UserDetail } from '@customTypes/userdetails';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: UserDetail | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ user: UserDetail; isLoggedIn: boolean }>,
        ) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
