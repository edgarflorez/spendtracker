import { Injectable } 			from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { JwtService } 			from './jwt.service'
import { IncomeModel } 			from '../_models/income-model';
import { LogService } 			from './log.service';

@Injectable()
export class IncomesService extends JwtService {
	// Constructor
	constructor(
		private http:Http,
		private log:LogService
	){super();}
	// Public Methods
	getIncomesByDate(id: number) {

		let data = {
    		'id': 			id,
    		'Authorization':this.jwtString()
    	}
		let headers = new Headers({ 'params': JSON.stringify( data )});
    	let options = new RequestOptions({ headers: headers });

    	return this.http.get('http://localhost:8888/spendTrackerService/api/getIncomesByDate', options)
		//return this.http.get('../spendTrackerService/api/getIncomesByDate', options)
			.map( (response: Response) =>{
				// Translate the server side response into app model structure
				let responseParsed		 = [];
				for(let entry of response.json()){
					let tempArray 			= new IncomeModel();
					tempArray['id'] 		= entry.Id;
					tempArray['ammount']	= entry.Ammount;
					tempArray['date']		= entry.Date;
					tempArray['description']= entry.Description;
					responseParsed.push(tempArray);
				}
				return responseParsed;
				// console.log('spends.service :: getIncomesByDate ', response['_body']);
				// return response['_body'];
			})
	}
	getIncomeById(id: number) {

		let data = {
    		'id': id,
    		'Authorization': this.jwtString()
    	}
		let headers = new Headers({ 'params': JSON.stringify( data )});
    	let options = new RequestOptions({ headers: headers });

    	return this.http.get('http://localhost:8888/spendTrackerService/api/getIncomeById', options)
		//return this.http.get('../spendTrackerService/api/getIncomeById', options)
			.map((response: Response) =>{
				let tempResponse 			= new IncomeModel();
				tempResponse['id'] 			= response.json().Id;
				tempResponse['ammount']		= response.json().Ammount;
				tempResponse['date']		= response.json().Date;
				tempResponse['description'] = response.json().Description;
				return tempResponse;
				// console.log('spends.service :: getIncomeById ', response['_body']);
				// return response['_body'];
			})
	}
	addIncome(spend:IncomeModel){

		let data = {
    		'userId': 		JSON.parse( localStorage.getItem("currentUser") ).id,
    		'ammount': 		spend.ammount,
    		'date': 		spend.date,
    		'description': 	spend.description,
    		'Authorization':this.jwtString()
    	}

    	return this.http.post('http://localhost:8888/spendTrackerService/api/addIncome', data)
		//return this.http.post('../spendTrackerService/api/addIncome', data)
			.map( (response: Response ) => {
				console.log('spends.service :: addIncome ', response['_body']);

				let log = {};
				log['type'] 		= this.log.INCOME_CREATE;
				log['data'] 		= {};
				log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
				log['data']['spend']= spend;
				log['data']['date'] = new Date();
				this.log.record(log);
				return response;
			})
	}
	deleteIncome(spendId: number){

		let data = {
    		'userId': 		JSON.parse( localStorage.getItem("currentUser") ).id,
    		'id': 			spendId,
    		'Authorization': this.jwtString()
    	}

    	return this.http.post('http://localhost:8888/spendTrackerService/api/deleteIncome', data)
		//return this.http.post('../spendTrackerService/api/deleteIncome', data)
			.map( (response:Response) =>{
				console.log('spends.service :: deleteIncome ', response['_body']);

				let log = {};
				log['type'] 		= this.log.INCOME_DELETE;
				log['data'] 		= {};
				log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
				log['data']['spendId']= spendId;
				log['data']['spendData']= response['_body'];
				log['data']['date'] = new Date();
				this.log.record(log);
				return response;
			})
	}
	updateIncome(spend:IncomeModel) {

		let data = {
    		'userId': 		JSON.parse( localStorage.getItem("currentUser") ).id,
    		'id': 			spend.id,
    		'ammount': 		spend.ammount,
    		'date': 		spend.date,
    		'description': 	spend.description,
    		'Authorization': this.jwtString()
    	}

    	return this.http.post('http://localhost:8888/spendTrackerService/api/updateIncome', data)
		//return this.http.post('../spendTrackerService/api/updateIncome', data)
			.map( (response: Response ) => {
				let log = {};
				log['type'] 		= this.log.INCOME_UPDATE;
				log['data'] 		= {};
				log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
				log['data']['spend']= spend;
				log['data']['date'] = new Date();
				this.log.record(log);
				console.log('spends.service :: updateIncome ', response['_body']);
				return response;
			})
	}
}
