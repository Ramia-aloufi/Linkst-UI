import type { UUID } from "crypto";
import type { Profile } from "./Profile";

export type Reel = {
    id: UUID;
    videoUrl: string;
    title: string;
    createdAt:Date
    user: {
        id: number;
        fullName: string;
        profile?: Profile;
    };
};
