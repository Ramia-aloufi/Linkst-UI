import type { Profile } from "./Profile";

export type Reel = {
    id: number;
    videoUrl: string;
    title: string;
    createdAt:Date
    user: {
        id: number;
        fullName: string;
        profile?: Profile;
    };
};
