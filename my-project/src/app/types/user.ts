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

export interface UserForAuth {
    username: string;
    email: string;
    tel: string;
    password: string;
    _id: string;
    image: string; 
    token: string;
    instagram: string; 
    facebook: string;
}

export interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    __v: number;
    _ownerId: UserForAuth; 
}


export interface ProfileDetails{
    username: string;
    email: string;
    tel: string
}