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
var mock_spends_1 = require('../mock/mock.spends');
var categories_service_1 = require('./categories.service');
var SpendsService = (function () {
    function SpendsService(categoriesService) {
        this.categoriesService = categoriesService;
    }
    SpendsService.prototype.getSpendsByDate = function (id) {
        console.log("ID ::", id);
        var filterSpends = [];
        for (var i = 0; i < mock_spends_1.SPENDS.length; i++) {
            if (mock_spends_1.SPENDS[i].date == id) {
                filterSpends.push(mock_spends_1.SPENDS[i]);
            }
        }
        ;
        console.log("filterSpends :: ", filterSpends);
        return Promise.resolve(filterSpends);
    };
    SpendsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [categories_service_1.CategoriesServie])
    ], SpendsService);
    return SpendsService;
}());
exports.SpendsService = SpendsService;
//# sourceMappingURL=spends.service.js.map