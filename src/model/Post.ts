import type { UUID } from "crypto";


export type CreatePost={
    content: string;
    media: string; 
    caption: string; 
}
export type Post = {
    id: UUID;
    content: string;
    media: string; 
    caption: string; 
    createdAt: Date;
    user: {
        id: string;
        fullName: string;
        profilePictureUrl?: string;
    };
    likeCount:number
    commentCount:number
    likedByCurrentUser:boolean
}

