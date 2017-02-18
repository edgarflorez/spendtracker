"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
// used to create fake backend
// import { fakeBackendProvider } from './_helpers/index';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';
// If you are using systemjs package loader import the MyDateRangePickerModule from here:
// import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';
var app_component_1 = require("./app.component");
var calendar_component_1 = require("./calendar.component");
var day_component_1 = require("./day.component");
var spend_component_1 = require("./spend.component");
var auth_component_1 = require("./auth.component");
var app_routing_module_1 = require("./app-routing.module");
var index_1 = require("./_guards/index");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            // MyDatePickerModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            calendar_component_1.CalendarComponent,
            day_component_1.DayComponent,
            spend_component_1.SpendComponent,
            auth_component_1.AuthComponent
        ],
        providers: [
            index_1.AuthGuard,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map