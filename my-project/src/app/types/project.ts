import { User } from "./user";

export interface Project{
    subscribers: string[];
    _id: string;
    projectName: string;
    userId: User;
    created_at: string;
    updatedAt: string;
    __v: number;
}