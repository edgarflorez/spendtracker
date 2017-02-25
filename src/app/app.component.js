"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_alert_1 = require("./utils/app.alert");
var user_service_1 = require("./_services/user.service");
var dates_service_1 = require("./_services/dates.service");
var spends_service_1 = require("./_services/spends.service");
var categories_service_1 = require("./_services/categories.service");
var app_auth_service_1 = require("./_services/app-auth.service");
var index_1 = require("./_helpers/index");
var testing_1 = require("@angular/http/testing");
var http_1 = require("@angular/http");
var AppComponent = (function () {
    function AppComponent() {
        this.appName = 'Spend Tracker';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: 'app.component.html',
        providers: [
            app_alert_1.AppAlert,
            user_service_1.UserService,
            dates_service_1.DatesService,
            spends_service_1.SpendsService,
            categories_service_1.CategoriesService,
            app_auth_service_1.AppAuthService,
            index_1.fakeBackendProvider,
            testing_1.MockBackend,
            http_1.BaseRequestOptions,
        ]
    })
], AppComponent);
exports.AppComponent = AppComponent;
// export class AppComponent  { appName = 'ANGULAR LAB'; }
//# sourceMappingURL=app.component.js.map