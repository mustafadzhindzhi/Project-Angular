import { UserForAuth } from "./user";

export interface Project {
    _id: string;
    projectName: string;
    mainPhoto: string;
    smallDesc: string;
    createdAt: string;
    industry: string;
    deliverables: string;
    systems: string[];
    bigDescription: string;
    challenges: string[];
    approach: string;
    images: string[];
    likes: string[];
    userId: string; 
    updatedAt: string;
    __v: number;
    _ownerId: UserForAuth; 
}
