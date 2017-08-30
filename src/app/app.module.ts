import { NgModule }         from '@angular/core';
import { BrowserModule } 	  from '@angular/platform-browser';
import { FormsModule }    	from '@angular/forms';
import { RouterModule }		  from '@angular/router';
import { HttpModule }       from '@angular/http';

// If you are using systemjs package loader import the MyDateRangePickerModule from here:
import { MyDatePickerModule } from 'mydatepicker';
import { CollapseModule }   from 'ngx-bootstrap'; 

import { AppComponent }     from './app.component';
import { CalendarComponent }from './calendar.component';
import { DayComponent }     from './day.component'; 
import { SpendComponent }   from './spend.component';
import { CalendarIncomeComponent }from './calendarIncome.component';
import { DayIncomeComponent }     from './dayIncome.component'; 
import { IncomeComponent }     from './income.component';
import { AuthComponent }    from './auth.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard }        from './_guards/index'; 


@NgModule({
  imports:      [ 
  	BrowserModule, 
  	FormsModule,
    HttpModule,
  	MyDatePickerModule,
  	AppRoutingModule,
    CollapseModule.forRoot()
  ],
  declarations: [ 
  	AppComponent,
  	CalendarComponent,
  	DayComponent,
    SpendComponent,
    CalendarIncomeComponent,
    DayIncomeComponent,
    IncomeComponent,
    AuthComponent 
  ],
  providers: 	[
    AuthGuard
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
