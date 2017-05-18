# get-package-downloads
Get the number of downloads of NpmJs packages, or a GitHub repository which is published on NpmJs.

# Installation
```
npm install get-package-downloads
```

# Imports

### app.module.ts
```ts
...

import { HttpModule } from '@angular/http';
import { NpmService } from 'get-package-downloads';

...

  declarations: [
   ...
  ],
  imports: [
    
    ...

    HttpModule,
    
    ...
  ],
  
  ....

  providers: [
    ...

    NpmService,
    
    ...
  ]
```

Check if @angular/http is installed, if not type:
```bash
npm i --save @angular/http
```

#### component.ts
```ts
import { NpmService } from 'get-package-downloads';

...

constructor(public npmService: NpmService) {}

````


# Usage

Use any function that fits your case.

## 1) Downloads of a package
Get the downloads of a package, the argument is typeOf string
```ts
this.npmService.getDowloadsPackage(packageName).subscribe(res => {
    // Downloads
    res.downloads;
});
```

## 2) Get info of package from NpmJs
```ts
this.npmService.getPackageInfo(packageName: string).subscribe(res=>{
    console.log(res);
});
```

Example: the packageInfo for "localforage" will return the json:
```
{
  "name": "localforage",
  "author": {
    "name": "Mozilla"
  },
  "license": "Apache-2.0",
  "description": "Offline storage, improved.",
  "keywords": [
    "indexeddb",
    "localstorage",
    "storage",
    "websql"
  ],
  "version": "1.5.0",
  "homepage": "https://github.com/localForage/localForage",
  "repository": {
    "type": "git",
    "url": "git://github.com/localForage/localForage.git"
  },
  "scripts": {
    "publish-docs": "node -e \"require('grunt').cli()\" null copy build-rules-html publish-rules",
    "test": "node -e \"require('grunt').cli()\" null test"
  },
  "devDependencies": {
    "babel-core": "^6.5.1",
    "babel-loader": "^6.2.2",
    "babel-plugin-add-module-exports": "^0.1.2",
    "babel-plugin-transform-es2015-modules-umd": "^6.5.0",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-es2015-loose": "^7.0.0",
    "babelify": "^7.2.0",
    "browserify-derequire": "^0.9.4",
    "bundle-collapser": "^1.2.1",
    "cors": "^2.3.1",
    "grunt": "^0.4.2",
    "grunt-babel": "^6.0.0",
    "grunt-browserify": "^3.8.0",
    "grunt-contrib-concat": "^0.3.0",
    "grunt-contrib-connect": "^0.8.0",
    "grunt-contrib-jshint": "^1.0.0",
    "grunt-contrib-uglify": "^0.4.0",
    "grunt-contrib-watch": "^0.5.0",
    "grunt-es3-safe-recast": "^0.1.0",
    "grunt-jscs": "^1.5.0",
    "grunt-mocha": "^0.4.10",
    "grunt-rollup": "^0.6.2",
    "grunt-run": "^0.5.2",
    "grunt-saucelabs": "^5.1.2",
    "grunt-ts": "^6.0.0-beta.11",
    "grunt-webpack": "^1.0.11",
    "load-grunt-tasks": "^0.4.0",
    "mocha": "^1.18.2",
    "phantomjs": "^1.9.7-12",
    "rollupify": "^0.1.0",
    "script-loader": "^0.6.1",
    "typescript": "^2.0.3",
    "uglify-js": "^2.3.x",
    "webpack": "^1.12.13",
    "webpack-dev-server": "^1.10.1"
  },
  "main": "dist/localforage.js",
  "typings": "typings/localforage.d.ts",
  "bugs": {
    "url": "http://github.com/localForage/localForage/issues"
  },
  "dependencies": {
    "lie": "3.0.2"
  },
  "gitHead": "e09ee3966862d50d101b6e2b442e4ad53b58663c",
  "_id": "localforage@1.5.0",
  "_shasum": "6b994e19b56611fa85df3992df397ac4ab66e815",
  "_from": ".",
  "_npmVersion": "3.10.10",
  "_nodeVersion": "6.9.5",
  "_npmUser": {
    "name": "tofumatt",
    "email": "matt@lonelyvegan.com"
  },
  "dist": {
    "shasum": "6b994e19b56611fa85df3992df397ac4ab66e815",
    "tarball": "https://registry.npmjs.org/localforage/-/localforage-1.5.0.tgz"
  },
  "maintainers": [
    {
      "name": "tofumatt",
      "email": "matt@lonelyvegan.com"
    }
  ],
  "_npmOperationalInternal": {
    "host": "packages-18-east.internal.npmjs.com",
    "tmp": "tmp/localforage-1.5.0.tgz_1487432373759_0.23809713358059525"
  },
  "directories": {
    
  }
}
```

## 3) Downloads of a repository "Currently not available"
Get the info of the repo and get the downloads from NpmJs, we will check if the published project on NpmJs has the same owner with the owner of the repository. If not, then null will be returned because this package is not owned from this user. Returns downloads of package or null and assigns the downloads in the repo object.
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
  downloads: number;
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