export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at?: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
};

export type Profile = {
  id: string;
  name: string;
  bio?: string;
  date: string;
};
