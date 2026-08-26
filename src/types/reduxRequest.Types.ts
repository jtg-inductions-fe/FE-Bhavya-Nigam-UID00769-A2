import { UserDetail } from './userdetails.Types';

export interface ReduxRequest {
    userDetails: UserDetail;
    username: string;
    pat: string;
    isLoggedIn: boolean;
}
