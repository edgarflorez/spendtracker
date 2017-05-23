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
		// return this.http.get('/api/spends/getSpendsByDate/'+ id, this.jwt())
		return this.http.get('http://localhost:8888/spendTrackerService/api/getSpendsByDate?id='+ id + '&Authorization=' + this.jwtString() , this.jwt())
			.map( (response: Response) =>{
				// Translate the server side response into app model structure
				let responseParsed		 = [];
				for(let entry of response.json()){
					let tempArray 			= new SpendModel();
					tempArray['id'] 		= entry.Id;
					tempArray['ammount']	= entry.Ammount;
					tempArray['category']	= entry.Category;
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
		// return this.http.get('/api/spends/getSpendById/'+ id, this.jwt())
		return this.http.get('http://localhost:8888/spendTrackerService/api/getSpendById?id='+ id + '&Authorization=' + this.jwtString(), this.jwt())
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
		// return this.http.post('/api/spends', spend, this.jwt())
		return this.http.post('http://localhost:8888/spendTrackerService/api/addSpend?ammount='+ spend.ammount + '&category=' + spend.category + '&date=' + spend.date + '&description=' + spend.description + '&Authorization=' + this.jwtString() , spend, this.jwt())
			.map( (response: Response ) => {
				console.log('spends.service :: addSpend ', response['_body']);
				this.log.record({'type': this.log.SPEND_CREATE, 'data':{'user':JSON.parse( localStorage.getItem('currentUser') ), 'spend':spend, 'date': new Date() }} );
				return response;
			})
	}
	deleteSpend(spendId: number){
		console.log("HEY GET deleteSpend service");
		// return this.http.delete('/api/spends/'+ spendId, this.jwt())
		return this.http.post('http://localhost:8888/spendTrackerService/api/deleteSpend?id='+ spendId +'&Authorization=' + this.jwtString() , spendId, this.jwt())
			.map( (response:Response) =>{
				console.log('spends.service :: deleteSpend ', response['_body']);
				this.log.record({'type': this.log.SPEND_DELETE, 'data':{'user':JSON.parse( localStorage.getItem('currentUser') ), 'spendId':spendId, 'spendData': response['_body'], 'date': new Date() }} );
				return response;
			})
	}
	updateSpend(spend:SpendModel) {
		// return this.http.post('/api/spends/update', spend, this.jwt())
		return this.http.post('http://localhost:8888/spendTrackerService/api/updateSpend?id='+ spend.id +'&ammount='+ spend.ammount + '&category=' + spend.category + '&date=' + spend.date + '&description=' + spend.description + '&Authorization=' + this.jwtString() , spend, this.jwt())
			.map( (response: Response ) => {
				console.log('spends.service :: updateSpend ', response['_body']);
				this.log.record({'type': this.log.SPEND_UPDATE, 'data':{'user':JSON.parse( localStorage.getItem('currentUser') ), 'spend':spend, 'date': new Date() }} );
				return response;
			})
	}
	
	
}