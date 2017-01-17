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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
// If you are using systemjs package loader import the MyDateRangePickerModule from here:
var my_date_picker_module_1 = require('mydatepicker/dist/my-date-picker.module');
var app_component_1 = require('./app.component');
var calendar_component_1 = require('./calendar.component');
var day_component_1 = require('./day.component');
var spend_component_1 = require('./spend.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                my_date_picker_module_1.MyDatePickerModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '/calendar',
                        pathMatch: 'full'
                    },
                    {
                        path: 'calendar',
                        component: calendar_component_1.CalendarComponent
                    },
                    {
                        path: 'day/:id',
                        component: day_component_1.DayComponent
                    },
                    {
                        path: 'spend',
                        component: spend_component_1.SpendComponent
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                calendar_component_1.CalendarComponent,
                day_component_1.DayComponent,
                spend_component_1.SpendComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map