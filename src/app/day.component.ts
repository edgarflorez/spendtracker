import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit }      	from '@angular/core';
import { ActivatedRoute, Params } 	from '@angular/router';
import { Location }               	from '@angular/common';

import { DatesService } 			from './_services/dates.service';
import { SpendsService }			from './_services/spends.service';
import { SpendModel } 				from './_models/spend-model';
import { SpendCategory } 			from './_models/spend-category';

@Component({
	moduleId: 		module.id,
	selector: 		'day',
	templateUrl: 	'day.component.html'
})
export class DayComponent implements OnInit {
	// vars
	id: number;
	date: string;
	spends: SpendModel[];
	editModeOn: boolean;
	// Constructor
	constructor(
		private datesService: DatesService,
		private spendsService: SpendsService,
		private route: ActivatedRoute,
		private location: Location
	) {}
	// ngOnInit
	ngOnInit() {
		this.editModeOn = false;
		this.route.params
			.switchMap( (params: Params) => this.datesService.getDateById(+params['id']) )
			.subscribe(
				data => {
					this.id = data.id;
					this.date = data.date;
					this.getSpends(data.id)
				},
				error => {
					console.log( error.message );
				}
			);
	}
	// Private Functions
	getSpends(dateId: number): void{
		this.spendsService.getSpendsByDate( dateId )
			.subscribe( 
				data => {
					this.spends = data
				},
				error => {
					console.log( error.message );
				}
			); 
	}
	// Private Handlers
	goBack(): void {
		this.location.back();
	}
	onChangeEditMode():void {
		this.editModeOn = !this.editModeOn;
	}
}