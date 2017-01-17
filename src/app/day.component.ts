// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
// import 'rxjs/add/operator/switchMap';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DatesService } from './services/dates.service';

@Component({
	moduleId: module.id,
	selector: 		'day',
	templateUrl: 	'day.component.html'
})
export class DayComponent implements OnInit {
	id:string;
	constructor(
		private datesService: DatesService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit() {
		console.log("Day Init");
		console.log(this.route.params._value.id);

		this.id = this.route.params._value.id
		this.route.params
			.map(params => console.log(params['id']) )
			// .switchMap((params: Params) => console.log(params['id']); )
			// .switchMap((params: Params) => this.id = params['id'] );
			// .switchMap((params: Params) => console.log("TEST"); );

		// this.route.params
		//     .switchMap((params: Params) => this.heroService.getHero(+params['id']))
		//     .subscribe(hero => this.hero = hero);
	}
	goBack(): void {
		this.location.back();
	}
}