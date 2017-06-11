import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { JwtService } 			from './jwt.service'

@Injectable()
export class LogService  extends JwtService{
	// Service constants to track different services
	readonly LOGIN:string 			= "Log in"
	readonly LOGOUT:string 			= "Log out"
	readonly DATE_CREATE:string 	= "Date Create"
	readonly SPEND_CREATE:string 	= "Spend Create"
	readonly SPEND_DELETE:string 	= "Spend Delete"
	readonly SPEND_UPDATE:string 	= "Spend Update"

	

	// Construnctor
	constructor(
		private http:Http
	){super();}


	record(data:any){
		let log: any[] 	= JSON.parse(localStorage.getItem('logUser' + JSON.parse( localStorage.getItem("currentUser") ).id ) )  || [];
		let logData 	= JSON.stringify(data);
	    log.push(logData);
	    localStorage.setItem('logUser' + JSON.parse( localStorage.getItem("currentUser") ).id , JSON.stringify(log));
	}
	recordBK(data:any){

		let headers = new Headers({ 'dataType': 'jsonp'});
    	let options = new RequestOptions({ headers: headers });
    	let data = {
    		'type': data.type,
    		'data': data.data,
    		'Authorization': this.jwtString()
    	}

		// console.log("-------- ",data);
		return this.http.post('http://localhost:8888/spendTrackerService/api/logApp', data, options )
			.map( (response: Response) =>{
				// console.log("****************** "); 
				let log: any[] = JSON.parse(localStorage.getItem('log')) || [];

				// let logData = JSON.parse(response);
				let logData = "{'type':"+ data.type +",'data':"+ data.data +"}";

                // save log data

                log.push(logData);
                localStorage.setItem('log', JSON.stringify(log));

				// console.log('log.service :: Log ', response['_body']);
				return response;
			})
	}
}