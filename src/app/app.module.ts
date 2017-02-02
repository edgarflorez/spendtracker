import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule }    	from '@angular/forms';
import { RouterModule }		from '@angular/router'

// If you are using systemjs package loader import the MyDateRangePickerModule from here:
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';

import { AppComponent }  	from './app.component';
import { CalendarComponent }from './calendar.component';
import { DayComponent } 	from './day.component';	
import { SpendComponent }   from './spend.component';
import { AuthComponent } 	from './auth.component';

import { AppRoutingModule }	from './app-routing.module';



@NgModule({
  imports:      [ 
  	BrowserModule, 
  	FormsModule, 
  	MyDatePickerModule,
  	AppRoutingModule
  ],
  declarations: [ 
  	AppComponent,
  	CalendarComponent,
  	DayComponent,
  	SpendComponent,
    AuthComponent 
  ],
  providers: 	[],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
