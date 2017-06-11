import { Injectable } 			from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { JwtService } 			from './jwt.service'
import { SpendModel } 			from '../_models/spend-model';
import { CategoriesService } 	from './categories.service'; 
import { LogService } 			from './log.service';

@Injectable()
export class SpendsService extends JwtService {
	// Constructor
	constructor(
		private categoriesService: CategoriesService,
		private http:Http,
		private log:LogService
	){super();}
	// Public Methods
	getSpendsByDate(id: number) {

		let data = {
    		'id': 			id,
    		'Authorization':this.jwtString()
    	}
		let headers = new Headers({ 'params': JSON.stringify( data )});
    	let options = new RequestOptions({ headers: headers });

		return this.http.get('http://localhost:8888/spendTrackerService/api/getSpendsByDate', options)
			.map( (response: Response) =>{
				// Translate the server side response into app model structure
				let responseParsed		 = [];
				for(let entry of response.json()){
					let tempArray 			= new SpendModel();
					tempArray['id'] 		= entry.Id;
					tempArray['ammount']	= entry.Ammount;
					tempArray['categoryName']= entry.CategoryName;
					tempArray['date']		= entry.Date;
					tempArray['description']= entry.Description;
					responseParsed.push(tempArray);
				}
				return responseParsed;
				// console.log('spends.service :: getSpendsByDate ', response['_body']);
				// return response['_body'];
			})
	}
	getSpendById(id: number) {

		let data = {
    		'id': id,
    		'Authorization': this.jwtString()
    	}
		let headers = new Headers({ 'params': JSON.stringify( data )});
    	let options = new RequestOptions({ headers: headers });

		return this.http.get('http://localhost:8888/spendTrackerService/api/getSpendById', options)
			.map((response: Response) =>{
				let tempResponse 			= new SpendModel();
				tempResponse['id'] 			= response.json().Id;
				tempResponse['ammount']		= response.json().Ammount;
				tempResponse['category']	= response.json().Category;
				tempResponse['date']		= response.json().Date;
				tempResponse['description'] = response.json().Description;
				return tempResponse;
				// console.log('spends.service :: getSpendById ', response['_body']);
				// return response['_body'];
			})
	}
	addSpend(spend:SpendModel){

		let data = {
    		'userId': 		JSON.parse( localStorage.getItem("currentUser") ).id,
    		'ammount': 		spend.ammount,
    		'category': 	spend.category,
    		'date': 		spend.date,
    		'description': 	spend.description,
    		'Authorization':this.jwtString()
    	}

		return this.http.post('http://localhost:8888/spendTrackerService/api/addSpend', data)
			.map( (response: Response ) => {
				console.log('spends.service :: addSpend ', response['_body']);

				let log = {};
				log['type'] 		= this.log.SPEND_CREATE;
				log['data'] 		= {};
				log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
				log['data']['spend']= spend;
				log['data']['date'] = new Date();
				this.log.record(log);
				return response;
			})
	}
	deleteSpend(spendId: number){

		let data = {
    		'userId': 		JSON.parse( localStorage.getItem("currentUser") ).id,
    		'id': 			spendId,
    		'Authorization': this.jwtString()
    	}

		return this.http.post('http://localhost:8888/spendTrackerService/api/deleteSpend', data)
			.map( (response:Response) =>{
				console.log('spends.service :: deleteSpend ', response['_body']);

				let log = {};
				log['type'] 		= this.log.SPEND_DELETE;
				log['data'] 		= {};
				log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
				log['data']['spendId']= spendId;
				log['data']['spendData']= response['_body'];
				log['data']['date'] = new Date();
				this.log.record(log);
				return response;
			})
	}
	updateSpend(spend:SpendModel) {

		let data = {
    		'userId': 		JSON.parse( localStorage.getItem("currentUser") ).id,
    		'id': 			spend.id,
    		'ammount': 		spend.ammount,
    		'category': 	spend.category,
    		'date': 		spend.date,
    		'description': 	spend.description,
    		'Authorization': this.jwtString()
    	}

		return this.http.post('http://localhost:8888/spendTrackerService/api/updateSpend', data)
			.map( (response: Response ) => {
				let log = {};
				log['type'] 		= this.log.SPEND_UPDATE;
				log['data'] 		= {};
				log['data']['user'] = JSON.parse( localStorage.getItem("currentUser") );
				log['data']['spend']= spend;
				log['data']['date'] = new Date();
				this.log.record(log);
				console.log('spends.service :: updateSpend ', response['_body']);
				return response;
			})
	}
}