import { Injectable } 	from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { SpendDate } 	from '../_models/spend-date'
import { DATES } 		from '../mock/mock.dates';

@Injectable()
export class DatesService {
	
	constructor(
		private http:Http
	) {}

	// getDates(): Promise<SpendDate[]>{
	// 	return Promise.resolve( DATES );
	// }
	getDates(userId: number){
		return this.http.get('/api/dates/getDates/' + userId, this.jwt())
			.map( (response: Response) => {
				console.log("dates.service :: getDates ", response);
				return response;
			});
	}
	addDate(newDate: string): Promise<any>{
		let dateRepeated: boolean = false,
			dateA: Date,
			dateB: Date = new Date(newDate)
			;
		// Check if the date exists
		for(let date of DATES){
			dateA = new Date(date.date);
			if(dateA.getTime() === dateB.getTime()){
				dateRepeated = true;
			}
		}
		// prepare response
		console.log("newDate", newDate);
		let response: Object = {}
		if(!dateRepeated){
			if(newDate == ""){
				response['type'] = 500;
				response['data'] = "ERROR PLEASE SELECT A DATE"
			}else{
				let newId = DATES.length + 1;
				DATES.push({id:newId, date: newDate });
				this.dateSort(DATES);
				response['type'] = 200;
				response['data'] = DATES;
			}
		}else{
			response['type'] = 500;
			response['data'] = "ERROR DATE DUPLICATED"
		}
		return Promise.resolve( response );
	}

	dateSort(dates: any): void{
		dates.sort(function(a:any, b:any){ return a.date - b.date })
	}

	getDateById(id:number): Promise<SpendDate>{
		var date:SpendDate;

		for (var i = 0; i < DATES.length; i++) {
			if(DATES[i].id == id ){
				date = DATES[i]
			}	
		};

		return Promise.resolve( date );



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