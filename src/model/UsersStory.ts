import type { StoryRes } from "./Story";

export type UserStory = {
  id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  stories: StoryRes[];
};
