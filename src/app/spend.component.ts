import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params } 	from '@angular/router';
import { Location }               	from '@angular/common';

import { DatesService } 			from './services/dates.service';
import { SpendCategory } 			from './types/spend-category';
import { CategoriesService } 	from './services/categories.service';

@Component({
	moduleId: 		module.id,
	selector: 		'spend',
	templateUrl: 	'spend.component.html'
})
export class SpendComponent implements OnInit {
	dateId: number;
	date: string;
	categories: SpendCategory[];

	formAmmount:number 		= 1000;
	formDescription:string 	= "This is the awesome description";
	formCategoryId:number;
	formCategoryName:string;


	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private datesService: DatesService,
		private categoriesService: CategoriesService,
	) {}

	ngOnInit() {
		// this.route.params
		// 	.switchMap((params: Params) => this.datesService.getDateById(+params['id']))
		// 	.subscribe( response => {
		// 		this.date = response.date;	
		// 		this.getSpends(response.id)
		// 	} );
		this.route.params
			.switchMap((params: Params) => this.datesService.getDateById(+params['id']))
			.subscribe( response => {
				this.dateId 	= response.id;
				this.date  		= response.date;
				this.	getCategories();
			});
	}
	goBack(): void {
		this.location.back();
	}
	getCategories():void {
		this.categoriesService.getCategories().then( categories => this.categories = categories )
	}
}