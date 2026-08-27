import { localStoragePAT, localStorageUsername } from '@constant';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserDetail } from '@type/userdetails';

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
        login: (state, action: PayloadAction<{ user: UserDetail }>) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem(localStoragePAT);
            localStorage.removeItem(localStorageUsername);
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
