import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: 		module.id,
	selector: 		'spend',
	templateUrl: 	'spend.component.html'
})
export class SpendComponent implements OnInit {
	constructor() {}

	ngOnInit() {
		console.log("Spend Init");
	}
}