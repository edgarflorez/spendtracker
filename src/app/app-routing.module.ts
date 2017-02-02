import { NgModule } 				from "@angular/core";
import { RouterModule, Routes } 	from "@angular/router";

import { CalendarComponent }from './calendar.component';
import { DayComponent } 	from './day.component';	
import { SpendComponent } 	from './spend.component';
import { AuthComponent } 	from './auth.component';

const routes: Routes = [
	{
		path: 		'',
		redirectTo: '/calendar',
		pathMatch: 	'full'
	},
	{
		path: 		'calendar',
		component: 	CalendarComponent
	},
	{
		path: 		'day/:id',
		component: 	DayComponent
	},
	{
		path: 		'spend/:id',
		component: 	SpendComponent
	},
	{
		path: 		'spend/edit/:idSpend',
		component: 	SpendComponent
	},
	{
		path: 		'auth/:urlRedirect',
		component: 	AuthComponent
	}
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}