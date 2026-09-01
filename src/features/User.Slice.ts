import { LOCAL_STORAGE_PAT, LOCAL_STORAGE_USERNAME } from '@constant';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '@type/UserData.Types';

import { preLoadData } from './User.Slice.Function';

export const userSlice = createSlice({
    name: 'user',
    initialState: preLoadData(),
    reducers: {
        login: (state, action: PayloadAction<UserData>) => {
            state.userDetails = action.payload.userDetails;
            state.pat = action.payload.pat;
            state.username = action.payload.username;
            localStorage.setItem(
                LOCAL_STORAGE_USERNAME,
                action.payload.username,
            );
            localStorage.setItem(LOCAL_STORAGE_PAT, action.payload.pat);
        },
        logout: (state) => {
            state.userDetails = null;
            state.pat = null;
            state.username = null;
            localStorage.removeItem(LOCAL_STORAGE_PAT);
            localStorage.removeItem(LOCAL_STORAGE_USERNAME);
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
