// User contains a standard set of CRUD methods for managing users, it contains a jwt() method that's used to add the JWT token from local storage to the Authorization header each http request

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { UserModel } from '../_models/user-model';

@Injectable()
export  class UserService {
	constructor(
		private http: Http
	){}

	getAll(){
		return this.http.get('/api/users', this.jwt()).map((response:Response) => response.json());
	}

	getById(id: number){
		return this.http.get('/api/users/'+ id, this.jwt()).map((response: Response) => response.json());
	}
	getCurrentUserId(){
		if(localStorage.getItem('currentUser')){
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
			return currentUser.id;
		}

		return NaN;
	}

	createUser(user:UserModel){
		return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
	}

	updateUser(user:UserModel){
		return this.http.put('/api/users/' + user.id , this.jwt()).map((response: Response) => response.json());
	}

	delete(id: number){
		return this.http.delete('/api/users/'+ id, this.jwt()).map((response: Response) => response.json());
	}
	
	// private helper methods
	private jwt(){
		// create authorization header with jwt token
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser && currentUser.token){
			let headers = new Headers({'Authorization': 'Bearer '+ currentUser.token});
			return new RequestOptions({ headers: headers});
		}
	}
}