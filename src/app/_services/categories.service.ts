import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { JwtService } 	from './jwt.service'
import { SpendCategory } from '../_models/spend-category';

@Injectable()
export class CategoriesService extends JwtService {
	// Constructor
	constructor(
		private http:Http
	){super();}
	// Public Methods
	getCategories() {
		return this.http.get('/api/categories', this.jwt())
			.map( (response: Response ) => {
				console.log('categories.service :: getCategories ', response['_body']);
				return response['_body'];
			})
	}
}