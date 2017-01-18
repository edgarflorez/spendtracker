import { NgModule } 				from "@angular/core";
import { RouterModule, Routes } 	from "@angular/router";

import { CalendarComponent }from './calendar.component';
import { DayComponent } 	from './day.component';	
import { SpendComponent } 	from './spend.component';

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
		path: 		'spend',
		component: 	SpendComponent
	}
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}