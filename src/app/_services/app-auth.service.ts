import { Injectable } 	from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppAuthService {
	// Constructor
	constructor(
		private http:Http
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
			});
	}
	logout(){
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
	}

}
