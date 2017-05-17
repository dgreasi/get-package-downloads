// User model based on the structure of github api at
// https://api.github.com/users/{username}
export interface User {
  login: string;
  name: string;
  avatar_url: string;
  email: string;
  gists_url: string;
  html_url: string;
  blog: string;
  location: string;
  hireable: string;
  bio: string;
  created_at: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  type: string;
}
