import { Injectable } 			from '@angular/core';

import { SpendModel } 			from '../types/spend-model';
import { SPENDS }				from '../mock/mock.spends';
import { CategoriesService } 	from './categories.service';

@Injectable()
export class SpendsService {
	getSpendsByDate(id: number): Promise<SpendModel[]>  {
		let filterSpends: SpendModel[] = [];
		for (let i = 0; i < SPENDS.length; i++) {
			if(SPENDS[i].date == id){
				filterSpends.push(SPENDS[i]);
			}
		};
		return Promise.resolve( filterSpends );
	}
	getSpendById(id: number): Promise<SpendModel> {
		let filterSpend: SpendModel;
		for (let i = 0; i < SPENDS.length; i++) {
			if(SPENDS[i].id == id){
				filterSpend = SPENDS[i];
			}
		};
		return Promise.resolve( filterSpend );
	}
	addSpend(spend:SpendModel): Promise<any> {

		return this.categoriesService.getCategoryById( spend.category ).then( categoryName => {
			spend.id = SPENDS.length + 1;
			spend.categoryName = categoryName;
			SPENDS.push(spend);
			
			let response: Object = {}
			response['type'] = 200;
			response['data'] = "Spend created sucessfully";

			return Promise.resolve( response );	
		})
	}

	updateSpend(spend:SpendModel): Promise<any> {
		return this.categoriesService.getCategoryById( spend.category ).then( categoryName => {
			spend.categoryName = categoryName;

			for (let i = 0; i < SPENDS.length; i++) {
				if( spend.id ==  SPENDS[i].id){
					SPENDS[i] = spend
				}
			};
			
			let response: Object = {}
			response['type'] = 200;
			response['data'] = "Spend created sucessfully";

			return Promise.resolve( response );	
		})
	}

	constructor(
		private categoriesService: CategoriesService
	){}
}