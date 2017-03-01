import { Injectable } 	from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { JwtService } 	from './jwt.service'
import { SpendDate } 	from '../_models/spend-date'
import { LogService } 	from './log.service';

@Injectable()
export class DatesService extends JwtService {
	// Constructor
	constructor(
		private http:Http
		private log:LogService
	) {super();}
	// Private Methods
	getDates(userId: number){
		return this.http.get('/api/dates/getDates/' + userId, this.jwt())
			.map( (response: Response) => {
				return response['_body'];
			});
	}
	addDate(newDate:SpendDate){
		return this.http.post('/api/dates', newDate, this.jwt())
			.map( (response: Response) => {
				console.log("dates.service :: addDate ", response);
				this.log.record({'type': this.log.DATE_CREATE, 'data':{'user':JSON.parse( localStorage.getItem('currentUser') ), 'newDate':newDate, 'date': new Date() }} );
				return response;
			});
	}
	dateSort(dates: any): void{
		dates.sort(function(a:any, b:any){ return a.date - b.date })
	}
	getDateById(id:number){
		return this.http.get('/api/dates/getDateById/'+ id, this.jwt())
			.map( (response: Response) =>{
				return  response['_body'];
			});
	}
}