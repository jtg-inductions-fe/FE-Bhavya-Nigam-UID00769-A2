import { UserDetail } from './userdetails.Types';

export interface UserState {
    userDetails: UserDetail | null;
    username: string | null;
    pat: string | null;
}
