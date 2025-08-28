export type Project = {
  id: string;
  title: string;
  description: string;
  projectUrl: string;
  projectImagesUrls: string[];
  tools:Tool[]
  createdAt: string;
};

export type Tool = {
  id: string;
  name: string;
};
