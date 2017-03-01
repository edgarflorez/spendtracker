import { Injectable } 	from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
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
		return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password}))
			.map((response: Response) => {

				// login sussessful if there's a jwt token in response
				let user = response.json();
				if(user && user.token){
					// store user details and jwt token in local storage to keep the user logged in between page refreshes
					localStorage.setItem('currentUser', JSON.stringify(user));
				}

				this.log.record({'type': this.log.LOGIN, 'data':{'user': JSON.parse( localStorage.getItem('currentUser') ), 'date': new Date() }} );
			});
	}
	logout(){
		if(JSON.parse( localStorage.getItem('currentUser') )){
			this.log.record({'type': this.log.LOGOUT, 'data':{'user': JSON.parse( localStorage.getItem('currentUser') ), 'date': new Date() }} );
		}
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
	}

}
