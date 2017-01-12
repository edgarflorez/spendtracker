import { Component, OnInit } from '@angular/core';

import { SpendDate } from './types/spend-date';
import { DatesService } from './services/dates.service';

@Component({
	moduleId: module.id,
	selector: 'calendar',
	templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {
	// vars
	addDate: boolean = false;
	newDateFormatted: string = '';
	newDateTimeStamp: number = '';
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
	constructor( private datesService: DatesService ) {}

	// methods
	getDates(): void {
		this.datesService.getDates().then( dates => {this.dates = dates; console.log(this.dates);})
	}
	ngOnInit() {
		this.getDates();
		console.log("Calendar Init");
	}
	onDateChanged(event:any) {
	  // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
	  console.dir(event)
	  this.newDateFormatted = event.formatted;
	  this.newDateTimeStamp = event.jsdate;
	}
	onAddNewDate(event:any){
		event.stopPropagation();
		this.newDateFormatted = '';
		this.newDateTimeStamp = '';
		this.addDate = true;
	}
	onCancelAddNewDate(event:any){
		event.stopPropagation();
		this.addDate = false;
	}
	onSubmitAddNewDate(event:any){
		event.stopPropagation();
		this.addDate = false;
		this.dates.push({id:this.dates.length +1, date: this.newDateTimeStamp });
	}

}