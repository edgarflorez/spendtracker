import { Component } 	from '@angular/core';

import { DatesService } from './services/dates.service';
import { AppAlert }		from './utils/app.alert'

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	providers: [ DatesService, AppAlert ]
})
export class AppComponent  { appName = 'Spend Tracker'; }
