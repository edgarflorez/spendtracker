"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var calendar_component_1 = require("./calendar.component");
var day_component_1 = require("./day.component");
var spend_component_1 = require("./spend.component");
var auth_component_1 = require("./auth.component");
var index_1 = require("./_guards/index");
var routes = [
    {
        path: '',
        redirectTo: '/calendar',
        pathMatch: 'full'
    },
    {
        path: 'calendar',
        component: calendar_component_1.CalendarComponent,
        canActivate: [index_1.AuthGuard]
    },
    {
        path: 'day/:id',
        component: day_component_1.DayComponent,
        canActivate: [index_1.AuthGuard]
    },
    {
        path: 'spend/:id',
        component: spend_component_1.SpendComponent,
        canActivate: [index_1.AuthGuard]
    },
    {
        path: 'spend/edit/:idSpend',
        component: spend_component_1.SpendComponent,
        canActivate: [index_1.AuthGuard]
    },
    {
        path: 'login',
        component: auth_component_1.AuthComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map