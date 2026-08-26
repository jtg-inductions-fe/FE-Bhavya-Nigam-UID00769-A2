export interface UserDetail {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
    name: string | null;
    location: string | null;
    bio: string | null;
    followers: number;
    following: number;
    blog: string | null;
    email: string | null;
}
