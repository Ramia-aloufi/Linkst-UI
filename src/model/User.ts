import type { UUID } from "crypto";

export type User = {
    id: UUID;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
};
