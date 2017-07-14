import { Injectable } 	from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { JwtService } 	from './jwt.service'
import { SpendDate } 	from '../_models/spend-date'
import { LogService } 	from './log.service';

@Injectable()
export class DatesService extends JwtService {
	// Constructor
	constructor(
		private http:Http,
		private log:LogService
	) {super();}
	// Private Methods
	getDates(userId: number){

		let data = {
    		'id': userId,
    		'Authorization': this.jwtString()
    	}
		let headers = new Headers({ 'params': JSON.stringify( data )});
    	let options = new RequestOptions({ headers: headers });

    return this.http.get('http://localhost:8888/spendTrackerService/api/getDates', options)
		// return this.http.get('../spendTrackerService/api/getDates', options)
			.map( (response: Response) => {
				// Translate the server side response into app model structure
				let responseParsed		 = [];
				for(let entry of response.json()){
					let tempArray 		= new SpendDate();
					tempArray['id'] 	= entry.Id;
					tempArray['userId']	= entry.UserId;
					tempArray['date'] 	= entry.Date;
					responseParsed.push(tempArray);
				}
				return responseParsed;
			});
	}
	// addDate(newDate:SpendDate){
	addDate(newDate:any){

		let data = {
    		'date': newDate["date"],
    		'userId': newDate["userId"],
    		'Authorization': this.jwtString()
    	}

    return this.http.post('http://localhost:8888/spendTrackerService/api/addDate', data )
		// return this.http.post('../spendTrackerService/api/addDate', data )
			.map( (response: Response) => {
				console.log("dates.service :: addDate ", response);

				let log = {};
				log['type'] 		= this.log.DATE_CREATE;
				log['data'] 		= {};
				log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
				log['data']['newDate']= newDate;
				log['data']['date'] = new Date();
				this.log.record(log);

				return response;
			});
	}
	dateSort(dates: any): void{
		dates.sort(function(a:any, b:any){ return a.date - b.date })
	}
	getDateById(id:number){

		let data = {
    		'id': id,
    		'Authorization': this.jwtString()
    	}
		let headers = new Headers({ 'params': JSON.stringify( data )});
    	let options = new RequestOptions({ headers: headers });

    return this.http.get('http://localhost:8888/spendTrackerService/api/getDateById', options)
		// return this.http.get('../spendTrackerService/api/getDateById', options)
			.map( (response: Response) =>{
				// Translate the server side response into app model structure
				let responseParsed 		= new SpendDate();
				responseParsed['id'] 	= response.json().Id;
				responseParsed['date'] 	= response.json().Date;
				return responseParsed;
			});
	}
}
