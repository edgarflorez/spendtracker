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
var AppAuthService = (function () {
    function AppAuthService(router) {
        this.router = router;
        this.authenticated = false;
    }
    AppAuthService.prototype.isUserAuthenticated = function () {
        console.log("THE USER IS :: ", this.authenticated);
        if (!this.authenticated) {
            this.getAuthDialog();
        }
        return this.authenticated;
    };
    AppAuthService.prototype.getAuthDialog = function () {
        console.log("HEY YOU SHOULD BE LOGGED GO BACK");
        console.log(this.router.url);
        this.router.navigate(['/auth', this.router.url]);
    };
    AppAuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppAuthService);
    return AppAuthService;
}());
exports.AppAuthService = AppAuthService;
//# sourceMappingURL=app-auth.service.js.map