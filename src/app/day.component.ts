// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
// import 'rxjs/add/operator/switchMap';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DatesService } 	from './services/dates.service';
import { SpendsService }	from './services/spends.service';
import { SpendModel } 		from './types/spend-model';
import { SpendCategory } 	from './types/spend-category';

@Component({
	moduleId: module.id,
	selector: 		'day',
	templateUrl: 	'day.component.html'
})
export class DayComponent implements OnInit {
	id:number;
	date:string;
	spends: SpendModel[];
	editModeOn: boolean;

	constructor(
		private datesService: DatesService,
		private spendsService: SpendsService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit() {
		// Online example 
		// this.route.params
		// 	.switchMap((params: Params) => this.heroService.getHero(+params['id']))
		// 	.subscribe(hero => this.hero = hero);

		// this.route.params
		// 	.subscribe((params: Params) => this.id =  +params['id'] );

		this.editModeOn = false;

		this.route.params
			.switchMap((params: Params) => this.datesService.getDateById(+params['id']))
			.subscribe( response => {
				this.id = response.id;
				this.date = response.date;	
				this.getSpends(response.id)
			} );
	}
	goBack(): void {
		this.location.back();
	}
	getSpends(dateId: number): void{
		this.spendsService.getSpendsByDate( dateId ).then( spends => this.spends = spends ); 
	}
	// getCategoryName(categoryId: number): void{
	// 	this.categoriesService.getCategoryById( categoryId ).then( category => { return category.categoryName } );
	// }
	getCategoryName(categoryId: number): void  {
		// this.categoriesService.getCategoryById( categoryId ).then( category =>  {
			// return category;
		// });



		// this.categoriesService.getCategoryById( categoryId ).then( category => cat =  returnData(category.categoryName) ); 
		// function returnData (name): string {
		// 	return name;
		// }
		// return "CAT";
	}
	onChangeEditMode():void {
		console.log("MODE");
		this.editModeOn = !this.editModeOn;
	}
}