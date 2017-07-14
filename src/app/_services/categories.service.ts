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

		let data = {
    		'Authorization': this.jwtString()
    	}
		let headers = new Headers({ 'params': JSON.stringify( data )});
    	let options = new RequestOptions({ headers: headers });

    return this.http.get('http://localhost:8888/spendTrackerService/api/getCategories', options)
		// return this.http.get('../spendTrackerService/api/getCategories', options)
			.map( (response: Response ) => {
				let responseParsed		 = [];
				for(let entry of response.json()){
					let tempArray 		= new SpendCategory();
					tempArray['id'] 	= entry.Id;
					tempArray['categoryName'] = entry.CategoryName;
					responseParsed.push(tempArray);
				}
				console.log('categories.service :: getCategories ', responseParsed);
				return responseParsed;
				// return response['_body'];
			})
	}
}
