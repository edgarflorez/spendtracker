import { Injectable } 	from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AppAuthService {
	authenticated:boolean = false;

	isUserAuthenticated():boolean{
		console.log("THE USER IS :: ", this.authenticated);
		if(!this.authenticated){
			this.getAuthDialog();
		}
		return this.authenticated;
	}

	getAuthDialog():void{
		console.log("HEY YOU SHOULD BE LOGGED GO BACK");
		console.log(this.router.url);
		this.router.navigate(['/auth', this.router.url ]);
	}

	constructor(
		private router:Router
	){

	}
}