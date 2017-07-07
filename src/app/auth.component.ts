import { Component, OnInit }    from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppAuthService }       from './_services/app-auth.service';
import { AppAlert }         from './utils/app.alert'

@Component({
  selector:     'auth',
  templateUrl:  'auth.component.html'
})

export class AuthComponent implements OnInit {
  // Vars
  model: any =    {};
  loading: boolean =  false;
  returnUrl: string;
  // Constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appAuthService: AppAuthService,
    private appAlert: AppAlert
  ) {}
  // ngOnInit
  ngOnInit() {
    // reset login status
    this.appAuthService.logout();

    // get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // Public Method
  login(){
    this.loading = true;
    this.appAuthService.login(this.model.user, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.dir(error);
          this.loading = false;
          this.appAlert.alert( error );
        }
      )
  }

}
