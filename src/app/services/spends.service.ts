import { Injectable } 			from '@angular/core';

import { SpendModel } 			from '../types/spend-model';
import { SPENDS }				from '../mock/mock.spends';
import { CategoriesService } 	from './categories.service';

@Injectable()
export class SpendsService {
	getSpendsByDate(id: number): Promise<SpendModel[]>  {
		console.log("ID ::", id);
		var filterSpends: SpendModel[] = [];
		for (var i = 0; i < SPENDS.length; i++) {
			if(SPENDS[i].date == id){
				filterSpends.push(SPENDS[i]);
			}
		};
		// console.log("filterSpends :: ", filterSpends);
		return Promise.resolve( filterSpends );
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

	constructor(
		private categoriesService: CategoriesService
	){}
}