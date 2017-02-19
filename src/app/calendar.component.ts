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
	// vars
	addDate: boolean = false;
	newDateFormatted: string = '';
	newDateJSDate: string = '';
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

  	// constructor
	constructor( 
		private datesService: DatesService,
		private appAlert: AppAlert,
		private userService: UserService
	) {}

	// methods
	getDates(): void {
		// this.datesService.getDates().then( dates => {this.dates = dates; console.log(this.dates);})
		this.datesService.getDates(this.userService.getCurrentUserId())
			.subscribe(
				data => {
					console.log("Calendar Component :: getDates ", data);
					this.dates = data;
				},
				error => {
					console.log( error.message );
				}
			)
	}
	ngOnInit() {
		this.getDates();
		console.log("Calendar Init");
	}
	onDateChanged(event:any) {
	  // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
	  console.dir(event)
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
					console.log("Calendar Component :: onSubmitAddNewDate ", data);
					this.addDate = false;
					this.getDates();
				},
				error => {
					console.log( error );
					this.addDate = false;
					this.appAlert.alert(error);
					// console.log("ERROR :: ", response.data);
				}

			)
		// this.datesService.addDate(this.newDateJSDate).then( response => {
		// 	switch(response.type){
		// 		case 200:
		// 			this.addDate = false;
		// 			this.dates = response.data;
		// 			console.log(this.dates);
		// 		break;
		// 		case 500:
		// 			this.addDate = false;
		// 			this.appAlert.alert("ERROR:: "+ response.data);
		// 			// console.log("ERROR :: ", response.data);
		// 		break;
		// 	}
		// });
	}

}