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
		private http:Http
		private log:LogService
	){super();}
	// Public Methods
	getSpendsByDate(id: number) {
		return this.http.get('/api/spends/getSpendsByDate/'+ id, this.jwt())
			.map( (response: Response) =>{
				console.log('spends.service :: getSpendsByDate ', response['_body']);
				return response['_body'];
			})
	}
	getSpendById(id: number) {
		return this.http.get('/api/spends/getSpendById/'+ id, this.jwt())
			.map((response: Response) =>{
				console.log('spends.service :: getSpendById ', response['_body']);
				return response['_body'];
			})
	}
	addSpend(spend:SpendModel){
		return this.http.post('/api/spends', spend, this.jwt())
			.map( (response: Response ) => {
				console.log('spends.service :: addSpend ', response['_body']);
				this.log.record({'type': this.log.SPEND_CREATE, 'data':{'user':JSON.parse( localStorage.getItem('currentUser') ), 'spend':spend, 'date': new Date() }} );
				return response;
			})
	}
	deleteSpend(spendId: number){
		return this.http.delete('/api/spends/'+ spendId, this.jwt())
			.map( (response:Response) =>{
				console.log('spends.service :: deleteSpend ', response['_body']);
				this.log.record({'type': this.log.SPEND_DELETE, 'data':{'user':JSON.parse( localStorage.getItem('currentUser') ), 'spendId':spendId, 'spendData': response['_body'] 'date': new Date() }} );
				return response;
			})
	}
	updateSpend(spend:SpendModel) {
		return this.http.post('/api/spends/update', spend, this.jwt())
			.map( (response: Response ) => {
				console.log('spends.service :: updateSpend ', response['_body']);
				this.log.record({'type': this.log.SPEND_UPDATE, 'data':{'user':JSON.parse( localStorage.getItem('currentUser') ), 'spend':spend, 'date': new Date() }} );
				return response;
			})
	}
	
	
}