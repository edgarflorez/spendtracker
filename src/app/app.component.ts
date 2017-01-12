import { Component } from '@angular/core';

import { DatesService } from './services/dates.service';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	providers: [ DatesService ]
})
export class AppComponent  { appName = 'Spend Tracker'; }
