import type { UUID } from "crypto"
import type { User } from "./User"

export type Chat = {
    id:UUID 
    users:User[]

}