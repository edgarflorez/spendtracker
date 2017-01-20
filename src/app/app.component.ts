import { Component } 	from '@angular/core';

import { AppAlert }		from './utils/app.alert'
import { DatesService } from './services/dates.service';
import { SpendsService }from './services/spends.service'

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	providers: [ AppAlert, DatesService, SpendsService ]
})
export class AppComponent  { appName = 'Spend Tracker'; }
