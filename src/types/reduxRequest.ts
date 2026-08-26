import { UserDetail } from './userdetails';

export interface ReduxRequest {
    user: UserDetail;
    username: string;
    pat: string;
    isLoggedIn: boolean;
}
