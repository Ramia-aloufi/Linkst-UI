import type { UUID } from "crypto"
import type { Profile } from "./Profile"

export type Chat = {
    id:UUID 
    users:UserChat[]

}

export type UserChat=
    {
            id: UUID;
            firstName: string;
            lastName: string;
            profile?: Profile;
            fullName:string
        };
