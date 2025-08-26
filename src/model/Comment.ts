import type { UUID } from "crypto";

export type PostComment = {
  id: UUID;
  comment: string;
  user: {
    id: string;
    fullName: string;
    profile:{
      profilePictureUrl:string|null;
    }
  }};