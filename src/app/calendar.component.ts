import { Component, OnInit }	from '@angular/core';

import { SpendDate } 			from './_models/spend-date';
import { DatesService } 		from './_services/dates.service';
import { UserService }			from './_services/user.service';
import { AppAlert }				from './utils/app.alert';

@Component({
	moduleId: module.id,
	selector: 'calendar',
	templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {
	// Vars
	addDate: boolean = 			false;
	newDateFormatted: string = 	'';
	newDateJSDate: string = 	'';
	dates: SpendDate[];
	myDatePickerOptions = {
		todayBtnTxt: 'Today',
		dateFormat: 'yyyy-mm-dd',
		firstDayOfWeek: 'mo',
		sunHighlight: true,
		height: '34px',
		width: '260px',
		inline: true,
		disableUntil: {year: 2016, month: 8, day: 10},
		selectionTxtFontSize: '12px'
  	};
  	// Constructor
	constructor( 
		private datesService: DatesService,
		private appAlert: AppAlert,
		private userService: UserService
	) {}
	// ngOnInit
	ngOnInit() {
		this.getDates();
		console.log("Calendar Init");
	}
	// Private Functions
	getDates(): void {
		this.datesService.getDates(this.userService.getCurrentUserId())
			.subscribe(
				data => {
					this.dates = data;
				},
				error => {
					console.log( error.message );
				}
			)
	}
	// Private Handlers
	onDateChanged(event:any) {
	  this.newDateFormatted = event.formatted;
	  this.newDateJSDate = event.jsdate;
	}
	onAddNewDate(event:any){
		event.stopPropagation();
		this.newDateFormatted = '';
		this.newDateJSDate = '';
		this.addDate = true;
	}
	onCancelAddNewDate(event:any){
		event.stopPropagation();
		this.addDate = false;
	}
	onSubmitAddNewDate(event:any){
		event.stopPropagation();
		this.datesService.addDate({'id':0, 'userId':this.userService.getCurrentUserId(), 'date': this.newDateJSDate } )
			.subscribe(
				data => {
					this.addDate = false;
					this.getDates();
				},
				error => {
					this.addDate = false;
					this.appAlert.alert(error.json().msg);
				}
			)
	}
}