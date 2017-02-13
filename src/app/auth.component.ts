// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import { ActivatedRoute, Params } 	from '@angular/router';
// import { Location }               	from '@angular/common';

import { Component, OnInit } 		from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppAuthService } 			from './_services/app-auth.service';
import { AppAlert }					from './utils/app.alert'

@Component({
	moduleId: 		module.id,
	selector: 		'auth',
	templateUrl: 	'auth.component.html'
})

export class AuthComponent implements OnInit {
	model: any = {};
	loading: boolean = false;
	returnUrl: string;
	// model = {
	// 	redirect:<string> '',
	// 	user:<string> '',
	// 	password:<string> ''
	// }

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private appAuthService: AppAuthService,
		private appAlert: AppAlert
	) {}

	ngOnInit() {
		// reset login status
		this.appAuthService.logout();

		// get return URL from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

		// this.route.params.subscribe((params: Params) => {
		// 	this.model.redirect = (params['urlRedirect']) ? params['urlRedirect'] : 'URL NOT VALID';
		// 	console.log(this.model.redirect);
		// });
	}

	login(){
		this.loading = true;
		this.appAuthService.login(this.model.user, this.model.password)
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
				},
				error => {
					// this.appAlert( 'ERROR : '+ error  );
					// this.appAlert( 'ERROR : todo service message' );
					this.loading = false;
				}
			)
	}

	// onSubmit():void{
	// 	console.log(this.model.user, this.model.password, this.model.redirect);
	// 	this.appAuthService.login(this.model.user, this.model.password, this.model.redirect).then(response => {
	// 		switch(response.type){
	// 			case 200:
	// 				console.log("SUCESS  NOT REACHED");
	// 			break;
	// 			case 500:
	// 				this.appAlert.alert(response.data);
	// 			break;
	// 		}
	// 	})
	// }



}