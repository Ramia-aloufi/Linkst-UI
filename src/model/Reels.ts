import type { User } from "./User";

export type Reel = {
    id: number;
    videoUrl: string;
    title: string;
    user: User;
};
