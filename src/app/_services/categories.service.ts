import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { SpendCategory } from '../_models/spend-category';
import { CATEGORIES } from '../mock/mock.categories';

@Injectable()
export class CategoriesService {
	constructor(
		private http:Http
	){}

	getCategoryById( id: number ): Promise<string> {
		var category: SpendCategory;
		for (var i = 0; i < CATEGORIES.length; i++) {
			if(CATEGORIES[i].id == id){
				category = CATEGORIES[i];
			}
		};
		return Promise.resolve( category.categoryName );
	}
	getCategories() {
		// return Promise.resolve( CATEGORIES );
		return this.http.get('/api/categories', this.jwt())
			.map( (response: Response ) => {
				console.log('categories.service :: getCategories ', response['_body']);
				return response['_body'];
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