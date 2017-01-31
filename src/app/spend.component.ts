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
	dateString: string;
	categories: SpendCategory[];
	action: string;
	editModeOn: boolean;
	editModeOnConfirm: boolean;

	model = {
		id:<number> null,
		date:<number> null,
		ammount:<number> null,
		description:<string> null,
		category:<number> null,
		categoryName:<string> null 
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
			this.action = (params['idSpend']) ? 'edit' : 'new';
			// console.log("A :", userId,this.action);

			switch(this.action){
				case 'new':
					this.route.params
						.switchMap((params: Params) => this.datesService.getDateById( userId ))
						.subscribe( response => {
							this.editModeOn = false;
							this.editModeOnConfirm = false;
							this.dateString = response.date;
							this.model.id 	= 0;
							this.model.categoryName = '';
							this.model.date = response.id;
							this.getCategories();
						});
				break;
				case  'edit':
					this.route.params
						.switchMap((params: Params) => this.spendsService.getSpendById( userId ))
						.subscribe( response => {
							this.editModeOn = true;
							this.editModeOnConfirm = false;
							// console.log(response);
							this.dateString = "SPEND DATE TODO";
							this.model 		= response;
							this.getCategories();
						});
				break;
			}
		});
	}
	goBack(): void {
		this.location.back();
	}
	getCategories():void {
		this.categoriesService.getCategories().then( categories => this.categories = categories )
	}
	onDeleteSpend(): void{
		this.editModeOnConfirm = true;
	}
	onDeleteSpendCancel(): void{
		this.editModeOnConfirm = false;
	}
	onDeleteSpendConfirm(): void{
		this.spendsService.dropSpend(this.model.id).then( response => {
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
	reset(): void{
		this.model = {
			id: null,
			date: null,
			ammount: null,
			description: null,
			category: null,
			categoryName: null
		};
	}
	onSubmit():void{

		let spend:SpendModel = {
			id: 			this.model.id,
			date: 			this.model.date,
			ammount: 		this.model.ammount,
			description: 	this.model.description,
			category: 		this.model.category,
			categoryName: 	""
		}

		switch(this.action){
			case 'new':
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
			break;
			case  'edit':
				this.spendsService.updateSpend(spend).then( response => {
					switch(response.type){
						case 200:
							this.location.back();
						break;
						case 500:
							console.log(response.data);
						break;
					}
				})
			break;
		}
	}

	// TODO: Remove this when we're done
  	get diagnostic() { return JSON.stringify(this.model); }
}