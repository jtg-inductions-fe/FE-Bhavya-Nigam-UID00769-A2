import { UserDetail } from './UserDetails.types';

export interface UserState {
    userDetails: UserDetail | null;
    username: string | null;
    pat: string | null;
}
