export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
  readTime: string;
  author: {
    name: string;
    avatar?: string;
  };
}
