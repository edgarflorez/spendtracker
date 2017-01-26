import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params } 	from '@angular/router';
import { Location }               	from '@angular/common';

import { DatesService } 			from './services/dates.service';
import { SpendCategory } 			from './types/spend-category';
import { CategoriesService } 		from './services/categories.service';
import { SpendsService } 			from './services/spends.service';
import { SpendModel } 				from './types/spend-model';

@Component({
	moduleId: 		module.id,
	selector: 		'spend',
	templateUrl: 	'spend.component.html'
})
export class SpendComponent implements OnInit {
	dateId: number;
	date: string;
	categories: SpendCategory[];

	model = {
		ammount:<number> null,
		description:<string> null,
		category:<number> null
	}

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private datesService: DatesService,
		private categoriesService: CategoriesService,
		private spendsService: SpendsService
	) {}

	ngOnInit() {

		// Check if is a new spend or and edition

		this.route.params.subscribe((params: Params) => {
	        let userId = (params['idSpend']) ? params['idSpend'] : params['id'];
	        let action = (params['idSpend']) ? 'edit' : 'new';
	        console.log("A :" userId,action);
	      });

		this.route.params
			.switchMap((params: Params) => {
				var obj:any = {};
				if(typeof params['idSpend'] != 'undefined'){
					obj['action'] = 'edit';  
					obj['id'] = params['idSpend'];
				}else{
					obj['action'] = 'new';  
					obj['id'] = params['id'];
				}
				return Promise.resolve( obj );
			})
			.subscribe( response => {
				console.log(response);
				// this.dateId 	= response.id;
				// this.date  		= response.date;
				this.	getCategories();
			});
		// console.log(this.route);
		// this.route.params
		// 	.switchMap((params: Params) => this.datesService.getDateById(+params['id']))
		// 	.subscribe( response => {
		// 		this.dateId 	= response.id;
		// 		this.date  		= response.date;
		// 		this.	getCategories();
		// 	});
	}
	goBack(): void {
		this.location.back();
	}
	getCategories():void {
		this.categoriesService.getCategories().then( categories => this.categories = categories )
	}
	reset(): void{
		this.model = {
			ammount: null,
			description: null,
			category: null
		};
	}
	onSubmit():void{
		console.log("SUBMIT");

		let spend:SpendModel = {
			id: 			0,
			date: 			this.dateId,
			ammount: 		this.model.ammount,
			description: 	this.model.description,
			category: 		this.model.category,
			categoryName: 	""
		}

		this.spendsService.addSpend(spend).then( response => {
			switch(response.type){
				case 200:
					this.location.back();
				break;
				case 500:
					console.log(response.data);
				break;
			}

		})

	}

	// TODO: Remove this when we're done
  	get diagnostic() { return JSON.stringify(this.model); }
}