import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 		'day',
	templateUrl: 	'day.component.html'
})
export class DayComponent implements OnInit {
	constructor() {}

	ngOnInit() {
		console.log("Day Init");
	}
}