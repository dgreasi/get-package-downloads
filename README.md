# get-package-downloads
Get the number of downloads of NpmJs packages, or a GitHub repository which is published on NpmJs.

# Currently NOT WORKING

# Installation
```
npm install get-package-downloads
```

# Import
```
import { NpmService } from 'get-package-downloads';

...

constructor(public npmService: NpmService) {}

````


# Usage

Use any function that fits your case.

## 1) Downloads of a package
Get the downloads of a package, the argument is typeOf string
```ts
this.npmService.getDowloadsPackage(packageName)
```

## 2) Downloads of a repository
Get the info of the repo and get the downloads from NpmJs, we will check if the published project on NpmJs has the same owner with the owner of the repository. If not, then null will be returned because this package is not owned from this user.
```ts
this.npmService.getDownloadsRepo(repo: Repo);
```

### Example for the model of Repo

#### Compulsory
The min objects you must provide, so that the library can work in this version are:
```ts
export interface Repo {
  name: string;
  html_url: string;
}
```

#### Optional
Repo model:
```ts
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
```

User model:
```ts
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
```

## 3) Get info of package from NpmJs
```ts
this.npmService.getPackageInfo(packageName: string);
```
