import type { Profile } from "./Profile";

export type Reel = {
    id: number;
    videoUrl: string;
    title: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        profile?: Profile;
    };
};
