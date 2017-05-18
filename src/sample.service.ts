import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Repo } from './repo';

@Injectable()
export class NpmService {
	npmUrl = 'https://api.npmjs.org/downloads/point/last-month';
	
	constructor(public http: Http) {}


	///////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////// Basic Functions ///////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////
	

	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////// DOWNLOADS OF A PACKAGE //////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////
	getDowloadsPackage(packageName: string) {
		this.getDownloads(packageName, 'corsanywhere');
	}


	getDownloads(packageName: string, provider: string) {
		let repoL = packageName.toLowerCase();
		// Get downloads for the specified package, return # of downloads
		// or null if the package doesn't exist
		this.getDownloadCountsRepo(repoL).subscribe(res => {
			return this.returnDownloads(res);
		});
	}


	///////////////////////////////////////////////////////////////////////////////////
	////////// DOWNLOADS OF A PACKAGE - INPUT FROM GITHUB REPOSITORY //////////////////
	///////////////////////////////////////////////////////////////////////////////////

	// Get the info of the repo and get the downloads from NpmJs, we will check if the
	// published project on NpmJs has the same owner with the repository given.
	// If not then null will be returned because this package is not owned from this user

	getDownloadsUserRepo(repo: Repo) {
		this.getDownloadsRepo(repo, 'corsanywhere');
	}

	getDownloadsOrgRepo(repo: Repo) {
		this.getDownloadsRepo(repo, 'corsnow');
	}


	getDownloadsRepo(repo: Repo, provider?: string) {
		if (!provider) {
			provider = 'corsanywhere';
		}

		let repoL = repo.name.toLowerCase();
		this.crossGet(`http://registry.npmjs.org/${repoL}/latest`,`${provider}`).map(res => res.json())
			.subscribe(res => {
			// GOT RESULT
			// console.log("Home page from repo: " + repo.url);
			// console.log("Home page from npm: " + res.homepage);
			// console.log("Got verification");
			if (repo.html_url == res.homepage) {
				this.getDownloadCountsRepo(repoL).subscribe(res => {
					Object.assign(repo, { downloads: (res.downloads ? res.downloads : null) });
				 // Object.assign(repo, { downloads: (this.returnDownloads(res)) });
				// console.log("Downloads of repo: " + this.repos[i].name + " are: " + res.downloads);
				});
			} else {
				Object.assign(repo, { downloads: null });
			}
			},
			 (err) => {
				// console.log(err);
				if (err.status == 404) {
				// console.log("NO package info");
				Object.assign(repo, { downloads: null });
				}
		});
	}


	///////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////// HELP FUNCTIONS ////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////


	returnDownloads(res) {
		if (res.downloads) {
			return res.downloads;
		} else {
			return null;
		}
	}


	///////////////////////////////////////////////////////////////////////////////////
	///////////////////////////// Intermediate Servers ////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////

	corsanywhere(url: string, options: any): any {
		var promise = this.http.get('https://cors-anywhere.herokuapp.com/' + url);
		return promise;
	};

	corsnow(url: string, options: any): any {
		var promise = this.http.get('https://cors.now.sh/' + url);
		return promise;
	};

	crossGet(url: string, provider: any, options?: any): any {
		var promise = this[provider](url, options);
		return promise;
	};


	///////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////// Npm Requests ///////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////

	// Get downloads of repo
	getDownloadCountsRepo(packageName: string): Observable<any> {
		return this.http.get(`${this.npmUrl}/${packageName}`)
		.map(res => <Repo>res.json())
	}

	getDistTags(packageName: string): Observable<any> {
		return this.http.get(`http://registry.npmjs.org/-/package/${packageName}/dist-tags`)
		.map(res => res.json());
	}

	getPackageInfo(packageName: string): Observable<any> {
		return this.crossGet(`http://registry.npmjs.org/${packageName}/latest`, 'corsanywhere')
		.map(res => res.json()); 
	}

	// https://skimdb.npmjs.com/registry/${packageName}
	// https://registry.npmjs.org/${packageName}/latest
	searchNpm(packageName: string): Observable<any> {
		return this.http.get(`http://npmsearch.com/query?q=${packageName}&fields=name`)
		.map(res => res.json())
	}

}