import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LogService{
	// Service constants to track different services
	const LOGIN:string 		= "Login"
	const LOGOUT:string 	= "Log out"
	const DATE_CREATE:string 	= "Date Create"
	const SPEND_CREATE:string 	= "Spend Create"
	const SPEND_DELETE:string 	= "Spend Delete"
	const SPEND_UPDATE:string 	= "Spend Update"

	// Construnctor
	constructor(
		private http:Http
	){}


	record(data:any){
		console.log("LOG ", data);
		this.http.post('/api/log', data)
			.map( (response: Response) =>{
				console.log('log.service :: Log ', response['_body']);
			})
	}
}