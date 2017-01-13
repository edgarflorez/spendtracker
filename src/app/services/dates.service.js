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
var mock_dates_1 = require('../mock/mock.dates');
var DatesService = (function () {
    function DatesService() {
    }
    DatesService.prototype.getDates = function () {
        return Promise.resolve(mock_dates_1.DATES);
    };
    DatesService.prototype.addDate = function (newDate) {
        var dateRepeated = false, dateA, dateB = new Date(newDate);
        // Check if the date exists
        for (var _i = 0, DATES_1 = mock_dates_1.DATES; _i < DATES_1.length; _i++) {
            var date = DATES_1[_i];
            dateA = new Date(date.date);
            if (dateA.getTime() === dateB.getTime()) {
                dateRepeated = true;
            }
        }
        // prepare response
        var response = {};
        if (!dateRepeated) {
            var newId = mock_dates_1.DATES.length + 1;
            mock_dates_1.DATES.push({ id: newId, date: newDate });
            this.dateSort(mock_dates_1.DATES);
            response['type'] = 200;
            response['data'] = mock_dates_1.DATES;
        }
        else {
            response['type'] = 500;
            response['data'] = "ERROR DATE DUPLICATED";
        }
        return Promise.resolve(response);
    };
    DatesService.prototype.dateSort = function (dates) {
        dates.sort(function (a, b) { return a.date - b.date; });
    };
    DatesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DatesService);
    return DatesService;
}());
exports.DatesService = DatesService;
//# sourceMappingURL=dates.service.js.map