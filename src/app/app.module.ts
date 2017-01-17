import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule }    	from '@angular/forms';
import { RouterModule }		from '@angular/router'

// If you are using systemjs package loader import the MyDateRangePickerModule from here:
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';

import { AppComponent }  	from './app.component';
import { CalendarComponent }from './calendar.component';
import { DayComponent } 	from './day.component';	
import { SpendComponent } 	from './spend.component';



@NgModule({
  imports:      [ 
  	BrowserModule, 
  	FormsModule, 
  	MyDatePickerModule,
  	RouterModule.forRoot([
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
	])
  ],
  declarations: [ 
  	AppComponent,
  	CalendarComponent,
  	DayComponent,
  	SpendComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
