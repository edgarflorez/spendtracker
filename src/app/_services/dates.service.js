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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var mock_dates_1 = require("../mock/mock.dates");
var DatesService = (function () {
    function DatesService(http) {
        this.http = http;
    }
    // getDates(): Promise<SpendDate[]>{
    // 	return Promise.resolve( DATES );
    // }
    DatesService.prototype.getDates = function (userId) {
        return this.http.get('/api/dates/getDates/' + userId, this.jwt())
            .map(function (response) {
            console.log("dates.service :: getDates ", response);
            return response;
        });
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
        console.log("newDate", newDate);
        var response = {};
        if (!dateRepeated) {
            if (newDate == "") {
                response['type'] = 500;
                response['data'] = "ERROR PLEASE SELECT A DATE";
            }
            else {
                var newId = mock_dates_1.DATES.length + 1;
                mock_dates_1.DATES.push({ id: newId, date: newDate });
                this.dateSort(mock_dates_1.DATES);
                response['type'] = 200;
                response['data'] = mock_dates_1.DATES;
            }
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
    DatesService.prototype.getDateById = function (id) {
        var date;
        for (var i = 0; i < mock_dates_1.DATES.length; i++) {
            if (mock_dates_1.DATES[i].id == id) {
                date = mock_dates_1.DATES[i];
            }
        }
        ;
        return Promise.resolve(date);
    };
    // private helper methods
    DatesService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return DatesService;
}());
DatesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DatesService);
exports.DatesService = DatesService;
//# sourceMappingURL=dates.service.js.map