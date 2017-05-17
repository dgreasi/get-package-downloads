# get-package-dowloads
Get the number of downloads of NpmJs packages, or a GitHub repository which is published on NpmJs.

# Installation
```
npm install get-package-downloads
```

# Usage

Use any function that fits your case.

1) Get the downloads of a package, the argument is typeOf string
```ts
this.getDowloadsPackage(packageName)
```

2) Get the info of the repo and get the downloads from NpmJs, we will check if the published project on NpmJs has the same owner with the owner of the repository. If not, then null will be returned because this package is not owned from this user.
```ts
this.getDownloadsRepo(repo: Repo);
```
3) Get info of package from NpmJs
```ts
this.getPackageInfo(packageName: string);
```
