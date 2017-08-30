import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { DatesService }       from './_services/dates.service';
import { SpendCategory }      from './_models/spend-category';
import { CategoriesService }    from './_services/categories.service';
import { IncomesService }      from './_services/incomes.service';
import { IncomeModel }         from './_models/income-model';

@Component({
  selector:     'income',
  templateUrl:  'income.component.html'
})
export class IncomeComponent implements OnInit {
  // Vars
  dateString: string;
  categories: SpendCategory[];
  action: string;
  editModeOn: boolean;
  editModeOnConfirm: boolean;
  model = {
    id:<number> null,
    date:<number> null,
    ammount:<number> null,
    description:<string> null
  }
  // Constructor
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private datesService: DatesService,
    private categoriesService: CategoriesService,
    private incomesService: IncomesService
  ) {}
  // ngOnInit
  ngOnInit() {
    // Check if is a new spend or and edition
    this.route.params.subscribe((params: Params) => {
      let userId = (params['idSpend']) ? params['idSpend'] : params['id'];
      this.action = (params['idSpend']) ? 'edit' : 'new';
      document.getElementById('spendInputAmmount').focus();
      switch(this.action){
        case 'new':
          this.editModeOn     = false;
          this.editModeOnConfirm  = false;

          this.model.id       = null;
          this.model.date     = params['id'];
          this.datesService.getDateById( +params['id'] )
            .subscribe(
              data => {
                this.dateString = data.date;
              },
              error => {
                console.log( error.message );
              }
            )
        break;
        case  'edit':
          this.route.params
            .switchMap((params: Params) => this.incomesService.getIncomeById( userId ))
            .subscribe( response => {
              this.editModeOn     = true;
              this.editModeOnConfirm  = false;
              this.model        = response;
              this.datesService.getDateById( this.model.date )
                .subscribe(
                  data => {
                    this.dateString = data.date;
                  },
                  error => {
                    console.log( error.message );
                  }
                )
            });
        break;
      }
    });
  }
  // Private Functions
  reset(): void{
    this.model = {
      id: null,
      date: null,
      ammount: null,
      description: null
    };
  }
  // Private Handlers
  goBack(): void {
    this.location.back();
  }
  onDeleteSpend(): void{
    this.editModeOnConfirm = true;
  }
  onDeleteSpendCancel(): void{
    this.editModeOnConfirm = false;
  }
  onDeleteSpendConfirm(): void{
    this.incomesService.deleteIncome(this.model.id)
      .subscribe(
        data => {
          this.location.back();
        },
        error => {
          console.log( error.message );
        }
      )
  }
  onSubmit(): void{
    let spend:IncomeModel = {
      id:       this.model.id,
      date:       this.model.date,
      ammount:    this.model.ammount,
      description:  this.model.description,
    }
    switch(this.action){
      case 'new':
        this.incomesService.addIncome(spend)
          .subscribe(
            data => {
              this.location.back();
            },
            error => {
              console.log(error);
            }
          )
      break;
      case  'edit':
        this.incomesService.updateIncome(spend)
          .subscribe(
            data => {
              this.location.back();
            },
            error => {
              console.log(error);
            }
          )
      break;
    }
  }

  // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}
