import { Component } 			from '@angular/core';

import { AppAlert }				from './utils/app.alert'
import { UserService }			from './_services/user.service';
import { DatesService } 		from './_services/dates.service';
import { SpendsService }		from './_services/spends.service'
import { CategoriesService }	from './_services/categories.service';
import { AppAuthService }		from './_services/app-auth.service';

import { fakeBackendProvider } 	from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } 	from '@angular/http';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	providers: [ 
		AppAlert,
		UserService,
		DatesService,
		SpendsService,
		CategoriesService,
		AppAuthService,

		fakeBackendProvider,
		MockBackend,
    	BaseRequestOptions,
	]
})
export class AppComponent  { appName = 'Spend Tracker'; }
// export class AppComponent  { appName = 'ANGULAR LAB'; }
