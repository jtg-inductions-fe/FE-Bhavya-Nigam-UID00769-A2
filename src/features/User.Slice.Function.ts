import { LOCAL_STORAGE_PAT, LOCAL_STORAGE_USERNAME } from '@constant';
import { UserState } from '@type/UserState.types';

export function preLoadData(): UserState {
    const username = localStorage.getItem(LOCAL_STORAGE_USERNAME);
    const password = localStorage.getItem(LOCAL_STORAGE_PAT);

    return {
        userDetails: null,
        username: username,
        pat: password,
    };
}
