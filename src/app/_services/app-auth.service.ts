import { Injectable } 	from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LogService } from './log.service';

@Injectable()
export class AppAuthService {
	// Constructor
	constructor(
		private http:Http,
		private log:LogService
	){}
	// Public Methods
	login(username: string, password:string){

		let headers = new Headers({ 'dataType': 'jsonp'});
    	let options = new RequestOptions({ headers: headers });
    	let data = {
    		'username': username,
    		'password': password
    	}

    // return this.http.post('http://localhost:8888/spendTrackerService/api/authenticate', data, options  )
		return this.http.post('../spendTrackerService/api/authenticate', data, options  )
			.map((response: Response) => {
				// login sussessful if there's a jwt token in response
				// Translate the server side response into the app model structure
				let user 			= {};
				user['id']			= response.json().Id;
				user['username'] 	= response.json().Username;
				user['firstName'] 	= response.json().FirstName;
				user['lastName'] 	= response.json().Lastname;
				user['username'] 	= response.json().Username;
				user['token'] 		= response.json().token;

				// let user = response.json();
				if(user && user['token']){
					// store user details and jwt token in local storage to keep the user logged in between page refreshes
					localStorage.setItem('currentUser', JSON.stringify(user));
				}

				let log = {};
				log['type'] 		= this.log.LOGIN;
				log['data'] 		= {};
				log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
				log['data']['date'] = new Date();
				this.log.record(log);
			});
	}
	logout(){

		if(JSON.parse( localStorage.getItem('currentUser') )){
			let log = {};
			log['type'] 		= this.log.LOGOUT;
			log['data'] 		= {};
			log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
			log['data']['date'] = new Date();
			this.log.record(log);
		}

		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
	}

}
