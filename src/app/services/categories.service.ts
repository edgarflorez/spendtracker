import { Injectable } from '@angular/core';

import { SpendCategory } from '../types/spend-category';
import { CATEGORIES } from '../mock/mock.categories';

@Injectable()
export class CategoriesServie {
	getCategoryById_( id: number ): Promise<SpendCategory> {
		var category: SpendCategory;
		for (var i = 0; i < CATEGORIES.length; i++) {
			if(CATEGORIES[i].id == id){
				category = CATEGORIES[i];
			}
		};
		return Promise.resolve( category );
	}
	getCategoryById( id: number ): Promise<string> {
		var category: SpendCategory;
		for (var i = 0; i < CATEGORIES.length; i++) {
			if(CATEGORIES[i].id == id){
				category = CATEGORIES[i];
			}
		};
		return Promise.resolve( category.categoryName );
	}
}