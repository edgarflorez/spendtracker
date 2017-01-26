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
var categories_service_1 = require('./services/categories.service');
var spends_service_1 = require('./services/spends.service');
var SpendComponent = (function () {
    function SpendComponent(route, location, datesService, categoriesService, spendsService) {
        this.route = route;
        this.location = location;
        this.datesService = datesService;
        this.categoriesService = categoriesService;
        this.spendsService = spendsService;
        this.model = {
            ammount: null,
            description: null,
            category: null
        };
    }
    SpendComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.route.params
        // 	.switchMap((params: Params) => this.datesService.getDateById(+params['id']))
        // 	.subscribe( response => {
        // 		this.date = response.date;	
        // 		this.getSpends(response.id)
        // 	} );
        this.route.params
            .switchMap(function (params) { return _this.datesService.getDateById(+params['id']); })
            .subscribe(function (response) {
            _this.dateId = response.id;
            _this.date = response.date;
            _this.getCategories();
        });
    };
    SpendComponent.prototype.goBack = function () {
        this.location.back();
    };
    SpendComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoriesService.getCategories().then(function (categories) { return _this.categories = categories; });
    };
    SpendComponent.prototype.reset = function () {
        this.model = {
            ammount: null,
            description: null,
            category: null
        };
    };
    SpendComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("SUBMIT");
        var spend = {
            id: 0,
            date: this.dateId,
            ammount: this.model.ammount,
            description: this.model.description,
            category: this.model.category,
            categoryName: ""
        };
        this.spendsService.addSpend(spend).then(function (response) {
            switch (response.type) {
                case 200:
                    _this.location.back();
                    break;
                case 500:
                    console.log(response.data);
                    break;
            }
        });
    };
    Object.defineProperty(SpendComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    SpendComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'spend',
            templateUrl: 'spend.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common_1.Location, dates_service_1.DatesService, categories_service_1.CategoriesService, spends_service_1.SpendsService])
    ], SpendComponent);
    return SpendComponent;
}());
exports.SpendComponent = SpendComponent;
//# sourceMappingURL=spend.component.js.map