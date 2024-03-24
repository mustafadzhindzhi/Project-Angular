export interface User{ 
    projects: string[];
    _id: string;
    tel: string;
    email: string;
    username: string;
    password: string;
    created_at: string;
    updatedAt: string;
    __v: number;
}

export interface UseForAuth {
    username: string;
    email: string;
    tel: string;
    password: string;
    id: string
}

export interface ProfileDetails{
    username: string;
    email: string;
    tel: string
}