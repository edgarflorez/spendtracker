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
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var dates_service_1 = require("./_services/dates.service");
var spends_service_1 = require("./_services/spends.service");
var DayComponent = (function () {
    // Constructor
    function DayComponent(datesService, spendsService, route, location) {
        this.datesService = datesService;
        this.spendsService = spendsService;
        this.route = route;
        this.location = location;
    }
    // ngOnInit
    DayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editModeOn = false;
        this.route.params
            .switchMap(function (params) { return _this.datesService.getDateById(+params['id']); })
            .subscribe(function (data) {
            _this.id = data.id;
            _this.date = data.date;
            _this.getSpends(data.id);
        }, function (error) {
            console.log(error.message);
        });
    };
    // Private Functions
    DayComponent.prototype.getSpends = function (dateId) {
        var _this = this;
        this.spendsService.getSpendsByDate(dateId)
            .subscribe(function (data) {
            _this.spends = data;
        }, function (error) {
            console.log(error.message);
        });
    };
    // Private Handlers
    DayComponent.prototype.goBack = function () {
        this.location.back();
    };
    DayComponent.prototype.onChangeEditMode = function () {
        this.editModeOn = !this.editModeOn;
    };
    return DayComponent;
}());
DayComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'day',
        templateUrl: 'day.component.html'
    }),
    __metadata("design:paramtypes", [dates_service_1.DatesService,
        spends_service_1.SpendsService,
        router_1.ActivatedRoute,
        common_1.Location])
], DayComponent);
exports.DayComponent = DayComponent;
//# sourceMappingURL=day.component.js.map