import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params } 	from '@angular/router';
import { Location }               	from '@angular/common';

import { AppAuthService } 	from './services/app-auth.service';

@Component({
	moduleId: 		module.id,
	selector: 		'auth',
	templateUrl: 	'auth.component.html'
})

export class AuthComponent implements OnInit {

	ngOnInit() {

	}

	constructor(
		private appAuthService: AppAuthService
	) {}

}