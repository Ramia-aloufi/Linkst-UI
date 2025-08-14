import type { UUID } from "crypto";

export type Profile = {
    id: string;
    profilePictureUrl: string;
    headerImageUrl: string;
    bio: string;
    location: string;
    website: string;
    user: UserProfile;
};


type UserProfile = {
        id: UUID
        firstName: string
        lastName: string
        email: string
        gender: string
        followers: UUID[]
        following: UUID[]
        fullName: string
}