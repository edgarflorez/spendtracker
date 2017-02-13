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
var dates_service_1 = require('./_services/dates.service');
var categories_service_1 = require('./_services/categories.service');
var spends_service_1 = require('./_services/spends.service');
var SpendComponent = (function () {
    function SpendComponent(route, location, datesService, categoriesService, spendsService) {
        this.route = route;
        this.location = location;
        this.datesService = datesService;
        this.categoriesService = categoriesService;
        this.spendsService = spendsService;
        this.model = {
            id: null,
            date: null,
            ammount: null,
            description: null,
            category: null,
            categoryName: null
        };
    }
    SpendComponent.prototype.ngOnInit = function () {
        // Check if is a new spend or and edition
        var _this = this;
        this.route.params.subscribe(function (params) {
            var userId = (params['idSpend']) ? params['idSpend'] : params['id'];
            _this.action = (params['idSpend']) ? 'edit' : 'new';
            // console.log("A :", userId,this.action);
            switch (_this.action) {
                case 'new':
                    _this.route.params
                        .switchMap(function (params) { return _this.datesService.getDateById(userId); })
                        .subscribe(function (response) {
                        _this.editModeOn = false;
                        _this.editModeOnConfirm = false;
                        _this.dateString = response.date;
                        _this.model.id = 0;
                        _this.model.categoryName = '';
                        _this.model.date = response.id;
                        _this.getCategories();
                    });
                    break;
                case 'edit':
                    _this.route.params
                        .switchMap(function (params) { return _this.spendsService.getSpendById(userId); })
                        .subscribe(function (response) {
                        _this.editModeOn = true;
                        _this.editModeOnConfirm = false;
                        // console.log(response);
                        _this.dateString = "SPEND DATE TODO";
                        _this.model = response;
                        _this.getCategories();
                    });
                    break;
            }
        });
    };
    SpendComponent.prototype.goBack = function () {
        this.location.back();
    };
    SpendComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoriesService.getCategories().then(function (categories) { return _this.categories = categories; });
    };
    SpendComponent.prototype.onDeleteSpend = function () {
        this.editModeOnConfirm = true;
    };
    SpendComponent.prototype.onDeleteSpendCancel = function () {
        this.editModeOnConfirm = false;
    };
    SpendComponent.prototype.onDeleteSpendConfirm = function () {
        var _this = this;
        this.spendsService.dropSpend(this.model.id).then(function (response) {
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
    SpendComponent.prototype.reset = function () {
        this.model = {
            id: null,
            date: null,
            ammount: null,
            description: null,
            category: null,
            categoryName: null
        };
    };
    SpendComponent.prototype.onSubmit = function () {
        var _this = this;
        var spend = {
            id: this.model.id,
            date: this.model.date,
            ammount: this.model.ammount,
            description: this.model.description,
            category: this.model.category,
            categoryName: ""
        };
        switch (this.action) {
            case 'new':
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
                break;
            case 'edit':
                this.spendsService.updateSpend(spend).then(function (response) {
                    switch (response.type) {
                        case 200:
                            _this.location.back();
                            break;
                        case 500:
                            console.log(response.data);
                            break;
                    }
                });
                break;
        }
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