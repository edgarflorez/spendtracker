import { Component }      from '@angular/core';

import { AppAlert }       from './utils/app.alert'
import { UserService }      from './_services/user.service';
import { DatesService }     from './_services/dates.service';
import { SpendsService }    from './_services/spends.service'
import { IncomesService }      from './_services/incomes.service';
import { CategoriesService }  from './_services/categories.service';
import { AppAuthService }   from './_services/app-auth.service';
import { LogService }   from './_services/log.service';

import { fakeBackendProvider }  from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions }   from '@angular/http';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [
    AppAlert,
    UserService,
    DatesService,
    SpendsService,
    IncomesService,
    CategoriesService,
    AppAuthService,
    LogService,

    // fakeBackendProvider,
    // MockBackend,
      BaseRequestOptions,
  ]
})
export class AppComponent  {

  appName = 'Spend Tracker';

  public isCollapsed:boolean = true;
  public modeOutcome:boolean = true;

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

  public setSpendMode(event:any):void {
    this.modeOutcome = true;
    this.isCollapsed = true
  }
  public setIncomedMode(event:any):void {
    this.modeOutcome = false;
    this.isCollapsed = true

  }
}
// export class AppComponent  { appName = 'ANGULAR LAB'; }
