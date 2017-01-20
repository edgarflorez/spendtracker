// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
// import 'rxjs/add/operator/switchMap';
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
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var dates_service_1 = require('./services/dates.service');
var spends_service_1 = require('./services/spends.service');
var DayComponent = (function () {
    function DayComponent(datesService, spendsService, route, location) {
        this.datesService = datesService;
        this.spendsService = spendsService;
        this.route = route;
        this.location = location;
    }
    DayComponent.prototype.ngOnInit = function () {
        // Online example 
        // this.route.params
        // 	.switchMap((params: Params) => this.heroService.getHero(+params['id']))
        // 	.subscribe(hero => this.hero = hero);
        var _this = this;
        // this.route.params
        // 	.subscribe((params: Params) => this.id =  +params['id'] );
        this.route.params
            .switchMap(function (params) { return _this.datesService.getDateById(+params['id']); })
            .subscribe(function (response) {
            _this.date = response.date;
            _this.getSpends(response.id);
        });
    };
    DayComponent.prototype.goBack = function () {
        this.location.back();
    };
    DayComponent.prototype.getSpends = function (dateId) {
        var _this = this;
        this.spendsService.getSpendsByDate(dateId).then(function (spends) { return _this.spends = spends; });
    };
    DayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'day',
            templateUrl: 'day.component.html'
        }), 
        __metadata('design:paramtypes', [dates_service_1.DatesService, spends_service_1.SpendsService, router_1.ActivatedRoute, common_1.Location])
    ], DayComponent);
    return DayComponent;
}());
exports.DayComponent = DayComponent;
//# sourceMappingURL=day.component.js.map