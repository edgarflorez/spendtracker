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
		// return this.http.get('/api/dates/getDates/' + userId, this.jwt())
		return this.http.get('http://localhost:8888/spendTrackerService/api/getDates?id=' + userId + '&Authorization=' + this.jwtString())
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
		// return this.http.post('/api/dates', newDate, this.jwt())
		// return this.http.post('http://localhost:8888/spendTrackerService/api/addDate?date=myDateString&userId=' + newDate["userId"] + '&Authorization=' + this.jwtString(), newDate, this.jwt() )
		return this.http.post('http://localhost:8888/spendTrackerService/api/addDate?date='+ newDate["date"] + '&userId=' + newDate["userId"] + '&Authorization=' + this.jwtString(), newDate, this.jwt() )
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
		// return this.http.get('/api/dates/getDateById/'+ id, this.jwt())
		return this.http.get('http://localhost:8888/spendTrackerService/api/getDateById?id=' + id + '&Authorization=' + this.jwtString(), id, this.jwt())
			.map( (response: Response) =>{
				// Translate the server side response into app model structure
				let responseParsed 		= new SpendDate();
				responseParsed['id'] 	= response.json().Id;
				responseParsed['date'] 	= response.json().Date;
				return responseParsed;
			});
	}
}