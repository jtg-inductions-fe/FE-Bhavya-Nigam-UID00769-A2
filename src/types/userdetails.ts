export interface UserDetail {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
    name: string;
    location: string | null;
    bio: string | null;
    followers: number;
    following: number;
    blog: string;
    email: string;
}
