import type { User } from "./User";

export type CreatePost={
    content: string;
    media: string; 
    caption: string; 
}
export type Post = {
    id: string;
    content: string;
    media: string; 
    caption: string; 
    createdAt: Date;
    updatedAt: Date;
    user: User;
    likes:User[]
    comments:User[]
};

