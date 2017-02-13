// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import { ActivatedRoute, Params } 	from '@angular/router';
// import { Location }               	from '@angular/common';
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var app_auth_service_1 = require('./_services/app-auth.service');
var app_alert_1 = require('./utils/app.alert');
var AuthComponent = (function () {
    // model = {
    // 	redirect:<string> '',
    // 	user:<string> '',
    // 	password:<string> ''
    // }
    function AuthComponent(route, router, appAuthService, appAlert) {
        this.route = route;
        this.router = router;
        this.appAuthService = appAuthService;
        this.appAlert = appAlert;
        this.model = {};
        this.loading = false;
    }
    AuthComponent.prototype.ngOnInit = function () {
        // reset login status
        this.appAuthService.logout();
        // get return URL from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.route.params.subscribe((params: Params) => {
        // 	this.model.redirect = (params['urlRedirect']) ? params['urlRedirect'] : 'URL NOT VALID';
        // 	console.log(this.model.redirect);
        // });
    };
    AuthComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.appAuthService.login(this.model.user, this.model.password)
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            // this.appAlert( 'ERROR : '+ error  );
            // this.appAlert( 'ERROR : todo service message' );
            _this.loading = false;
        });
    };
    AuthComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'auth',
            templateUrl: 'auth.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, app_auth_service_1.AppAuthService, app_alert_1.AppAlert])
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map