import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { DatesService }       from './_services/dates.service';
import { IncomesService }      from './_services/incomes.service';
import { IncomeModel }         from './_models/income-model';
import { SpendCategory }      from './_models/spend-category';

@Component({
  selector:     'day',
  templateUrl:  'dayIncome.component.html'
})
export class DayIncomeComponent implements OnInit {
  // vars
  id: number;
  date: string;
  incomes: IncomeModel[];
  editModeOn: boolean;
  // Constructor
  constructor(
    private datesService: DatesService,
    private incomeService: IncomesService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  // ngOnInit
  ngOnInit() {
    this.editModeOn = false;
    this.route.params
      .switchMap( (params: Params) => this.datesService.getDateIncomeById(+params['id']) )
      .subscribe(
        data => {
          this.id = data.id;
          this.date = data.date;
          this.getIncomes(data.id)
        },
        error => {
          console.log( error.message );
        }
      );
  }
  // Private Functions
  getIncomes(dateId: number): void{
    this.incomeService.getIncomesByDate( dateId )
      .subscribe(
        data => {
          this.incomes = data
        },
        error => {
          console.log( error.message );
        }
      );
  }
  // Private Handlers
  goBack(): void {
    this.location.back();
  }
  onChangeEditMode():void {
    this.editModeOn = !this.editModeOn;
  }
}
