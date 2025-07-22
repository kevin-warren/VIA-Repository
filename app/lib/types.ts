export type Post = {
    id: string;
    title: string;
    company: string;
    logo: string;
    category: string;
    date: string;
    applyBy?: string | null;
    location: string;
    pay?: string | null;
    presence: string;
    jobType: string;
    jobDescription?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    summary?: string | null;
    duties: string;
    qualifications: string;
    author?: string;
  };
  
  export type Profile = {
    id: string;
    name: string;
    bio: string | null;
    date: string;
    author: string;
    resume?: string | null;
    email: string;
    phone?: string | null;
    linkedin?: string | null;
    website?: string | null;
    headline: string;
  };