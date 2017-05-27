import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params } 	from '@angular/router';
import { Location }               	from '@angular/common';

import { DatesService } 			from './_services/dates.service';
import { SpendCategory } 			from './_models/spend-category';
import { CategoriesService } 		from './_services/categories.service';
import { SpendsService } 			from './_services/spends.service';
import { SpendModel } 				from './_models/spend-model';

@Component({
	moduleId: 		module.id,
	selector: 		'spend',
	templateUrl: 	'spend.component.html'
})
export class SpendComponent implements OnInit {
	// Vars
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
	// Constructor
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private datesService: DatesService,
		private categoriesService: CategoriesService,
		private spendsService: SpendsService
	) {}
	// ngOnInit
	ngOnInit() {
		// Check if is a new spend or and edition
		this.route.params.subscribe((params: Params) => {
			let userId = (params['idSpend']) ? params['idSpend'] : params['id'];
			this.action = (params['idSpend']) ? 'edit' : 'new';
			switch(this.action){
				case 'new':
					this.editModeOn 		= false;
					this.editModeOnConfirm 	= false;

					this.model.id 			= null;
					this.model.categoryName = '';
					this.model.date 		= params['id'];
					this.getCategories();
					this.datesService.getDateById( +params['id'] )
						.subscribe(
							data => {
								this.dateString = data.date;
							},
							error => {
								console.log( error.message );
							}
						)
				break;
				case  'edit':
					this.route.params
						.switchMap((params: Params) => this.spendsService.getSpendById( userId ))
						.subscribe( response => {
							this.editModeOn 		= true;
							this.editModeOnConfirm 	= false;
							this.model 				= response;
							this.getCategories();
							this.datesService.getDateById( this.model.date )
								.subscribe(
									data => {
										this.dateString = data.date;
									},
									error => {
										console.log( error.message );
									}
								)
						});
				break;
			}
		});
	}
	// Private Functions
	getCategories():void {
		this.categoriesService.getCategories()
			.subscribe(
				data => {
					this.categories = data
				},
				error => {
					console.log( error.message );
				}
			)
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
	// Private Handlers
	goBack(): void {
		this.location.back();
	}
	onDeleteSpend(): void{
		this.editModeOnConfirm = true;
	}
	onDeleteSpendCancel(): void{
		this.editModeOnConfirm = false;
	}
	onDeleteSpendConfirm(): void{
		this.spendsService.deleteSpend(this.model.id)
			.subscribe(
				data => {
					this.location.back();
				},
				error => {
					console.log( error.message );
				}
			)
	}
	onSubmit(): void{
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
				this.spendsService.addSpend(spend)
					.subscribe(
						data => {
							this.location.back();
						},
						error => {
							console.log(error); 
						}
					)
			break;
			case  'edit':
				this.spendsService.updateSpend(spend)
					.subscribe(
						data => {
							this.location.back();
						},
						error => {
							console.log(error); 
						}
					)
			break;
		}
	}

	// TODO: Remove this when we're done
  	get diagnostic() { return JSON.stringify(this.model); }
}