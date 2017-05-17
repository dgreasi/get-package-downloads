import { User } from './user';

export interface Repo {
  id: string;
  name: string;
  owner: User;
  full_name: string;
  description: string;
  fork: string;
  html_url: string;
  url: string;
  tags_url: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  downloads: number;
  start: number;
  end: number;
  languages: {string, number}[];
}
