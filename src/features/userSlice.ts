import { LOCAL_STORAGE_PAT, LOCAL_STORAGE_USERNAME } from '@constant';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '@type/UserData';
import { UserDetail } from '@type/UserDetails';

interface UserState {
    user: UserDetail | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserData>) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
            localStorage.setItem(
                LOCAL_STORAGE_USERNAME,
                action.payload.username,
            );
            localStorage.setItem(LOCAL_STORAGE_PAT, action.payload.pat);
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem(LOCAL_STORAGE_PAT);
            localStorage.removeItem(LOCAL_STORAGE_USERNAME);
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
