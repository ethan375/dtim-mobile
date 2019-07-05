import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceAPIService {

  constructor(private _apiService: ApiService) {

  }

  getThoseWithinTheLastThreeHours() {
  	let url = environment.apiUrl + "/api/candidates/in-attendance";

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					console.log("List of those in attendance received!");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  getLastSession() {
  	let url = environment.apiUrl + "/api/admin/lastSession";

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  startNewSession() {
  	let url = environment.apiUrl + "/api/admin/createSession";
  	let data = undefined;

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.postUnsecuredAPI(url, data).subscribe(
				(data) => { 
					console.log("New Session Created!");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }
}