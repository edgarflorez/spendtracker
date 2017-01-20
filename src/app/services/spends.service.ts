import { Injectable } 	from '@angular/core';

import { SpendModel } 	from '../types/spend-model';
import { SPENDS }		from '../mock/mock.spends';

@Injectable()
export class SpendsService {
	getSpendsByDate(id: number): Promise<SpendModel[]>  {
		console.log("ID ::", id);
		var filterSpends: SpendModel[] = [];
		for (var i = 0; i < SPENDS.length; i++) {
			if(SPENDS[i].date == id){
				filterSpends.push(SPENDS[i]);
				console.log(SPENDS[i]);
			}
			
		};
		console.log("filterSpends :: ", filterSpends);
		return Promise.resolve( filterSpends );
	}
	constructor(){}
}