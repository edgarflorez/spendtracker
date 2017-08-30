import { NgModule } 				from "@angular/core";
import { RouterModule, Routes } 	from "@angular/router";

import { CalendarComponent }from './calendar.component';
import { DayComponent } 	from './day.component';	
import { SpendComponent } 	from './spend.component';
import { CalendarIncomeComponent }from './calendarIncome.component';
import { DayIncomeComponent } 	from './dayIncome.component';
import { IncomeComponent } 	from './income.component';
import { AuthComponent } 	from './auth.component';
import { AuthGuard } 		from './_guards/index'; 

const routes: Routes = [
	{
		path: 		'',
		redirectTo: '/calendar',
		pathMatch: 	'full'
	},
	{
		path: 		'calendar',
		component: 	CalendarComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 		'day/:id',
		component: 	DayComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 		'spend/:id',
		component: 	SpendComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 		'spend/edit/:idSpend',
		component: 	SpendComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 		'calendar-income',
		component: 	CalendarIncomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 		'day-income/:id',
		component: 	DayIncomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 		'income/:id',
		component: 	IncomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 		'income/edit/:idSpend',
		component: 	IncomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 		'login',
		component: 	AuthComponent
	}
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}