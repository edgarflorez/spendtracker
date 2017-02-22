import { Injectable } 			from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { SpendModel } 			from '../_models/spend-model';
import { SPENDS }				from '../mock/mock.spends';
import { CategoriesService } 	from './categories.service'; 

@Injectable()
export class SpendsService {
	constructor(
		private categoriesService: CategoriesService,
		private http:Http
	){}

	// getSpendsByDate_old(id: number): Promise<SpendModel[]>  {
	// 	let filterSpends: SpendModel[] = [];
	// 	for (let i = 0; i < SPENDS.length; i++) {
	// 		if(SPENDS[i].date == id){
	// 			filterSpends.push(SPENDS[i]);
	// 		}
	// 	};
	// 	return Promise.resolve( filterSpends );
	// }
	getSpendsByDate(id: number) {
		return this.http.get('/api/spends/getSpendsByDate/'+ id, this.jwt())
			.map( (response: Response) =>{
				console.log('spends.service :: getSpendsByDate ', response['_body']);
				return response['_body'];
			})
	}
	getSpendById(id: number): Promise<SpendModel> {
		let filterSpend: SpendModel;
		for (let i = 0; i < SPENDS.length; i++) {
			if(SPENDS[i].id == id){
				filterSpend =  JSON.parse( JSON.stringify( SPENDS[i] ) );
			}
		};
		return Promise.resolve( filterSpend );
	}
	// addSpend_old(spend:SpendModel): Promise<any> {

	// 	return this.categoriesService.getCategoryById( spend.category ).then( categoryName => {
	// 		spend.id = SPENDS.length + 1;
	// 		spend.categoryName = categoryName;
	// 		SPENDS.push(spend);
			
	// 		let response: Object = {}
	// 		response['type'] = 200;
	// 		response['data'] = "Spend created sucessfully";

	// 		return Promise.resolve( response );	
	// 	})
	// }
	addSpend(spend:SpendModel){
		return this.http.post('/api/spends', spend, this.jwt())
			.map( (response: Response ) => {
				console.log('spends.service :: addSpend ', response['_body']);
				return response;
			})
	}
	dropSpend(spendId: number): Promise<any> {
		console.log("A", SPENDS);
		for (let i = SPENDS.length - 1; i >= 0; i--) {
			if(spendId == SPENDS[i].id){
				SPENDS.splice(i,1);
			}
		};
		console.log("B", SPENDS);


			
		let response: Object = {}
		response['type'] = 200;
		response['data'] = "Spend created sucessfully";

		return Promise.resolve( response );	

	}

	// updateSpend_old(spend:SpendModel): Promise<any> {
	// 	return this.categoriesService.getCategoryById( spend.category ).then( categoryName => {
	// 		spend.categoryName = categoryName;

	// 		for (let i = 0; i < SPENDS.length; i++) {
	// 			if( spend.id ==  SPENDS[i].id){
	// 				SPENDS[i] = spend
	// 			}
	// 		};
			
	// 		let response: Object = {}
	// 		response['type'] = 200;
	// 		response['data'] = "Spend created sucessfully";

	// 		return Promise.resolve( response );	
	// 	})
	// }
	updateSpend(spend:SpendModel): Promise<any> {
		return this.http.post('/api/spends/update', spend, this.jwt())
			.map( (response: Response ) => {
				console.log('spends.service :: updateSpend ', response['_body']);
				return response;
			})
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