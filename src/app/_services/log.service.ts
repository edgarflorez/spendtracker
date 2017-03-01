import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class LogService{
	// Service constants to track different services
	readonly LOGIN:string 			= "Login"
	readonly LOGOUT:string 		= "Log out"
	readonly DATE_CREATE:string 	= "Date Create"
	readonly SPEND_CREATE:string 	= "Spend Create"
	readonly SPEND_DELETE:string 	= "Spend Delete"
	readonly SPEND_UPDATE:string 	= "Spend Update"

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