import { Injectable } from '@angular/core';

import { SpendCategory } from '../types/spend-category';
import { CATEGORIES } from '../mock/mock.categories';

@Injectable()
export class CategoriesService {
	getCategoryById( id: number ): Promise<string> {
		var category: SpendCategory;
		for (var i = 0; i < CATEGORIES.length; i++) {
			if(CATEGORIES[i].id == id){
				category = CATEGORIES[i];
			}
		};
		return Promise.resolve( category.categoryName );
	}
	getCategories(): Promise<SpendCategory[]> {
		return Promise.resolve( CATEGORIES );
	}
}