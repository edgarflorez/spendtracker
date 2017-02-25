import { Http, Headers, RequestOptions, Response } from '@angular/http';

export class JwtService {
	jwt(){
		// create authorization header with jwt token
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser && currentUser.token){
			let headers = new Headers({'Authorization': 'Bearer '+ currentUser.token});
			return new RequestOptions({ headers: headers});
		}
	}
}