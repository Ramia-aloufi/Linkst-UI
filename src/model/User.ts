import type { UUID } from "crypto";
import type { Profile } from "./Profile";
import type { Post } from "./Post";
import type { StoryRes } from "./Story";

export type User = {
    id: UUID;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
};

export type UserInfo = {
    id:UUID
    fullName:string;
    firstName:string;
    lastName:string;
    email:string;
    gender:string;
    profile:Profile;
    followers:UUID[];
    following:UUID[];
    savedPosts:Post[];
    posts:Post[];
    stories:StoryRes[];
};

