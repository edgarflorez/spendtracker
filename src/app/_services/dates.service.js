"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var jwt_service_1 = require("./jwt.service");
var spend_date_1 = require("../_models/spend-date");
var log_service_1 = require("./log.service");
var DatesService = (function (_super) {
    __extends(DatesService, _super);
    // Constructor
    function DatesService(http, log) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.log = log;
        return _this;
    }
    // Private Methods
    DatesService.prototype.getDates = function (userId) {
        // return this.http.get('/api/dates/getDates/' + userId, this.jwt())
        return this.http.get('http://localhost:8888/spendTrackerService/api/getDates?id=' + userId + '&Authorization=' + this.jwtString())
            .map(function (response) {
            // Translate the server side response into app model structure
            var responseParsed = [];
            for (var _i = 0, _a = response.json(); _i < _a.length; _i++) {
                var entry = _a[_i];
                var tempArray = new spend_date_1.SpendDate();
                tempArray['id'] = entry.Id;
                tempArray['userId'] = entry.UserId;
                tempArray['date'] = entry.Date;
                responseParsed.push(tempArray);
            }
            return responseParsed;
        });
    };
    // addDate(newDate:SpendDate){
    DatesService.prototype.addDate = function (newDate) {
        var _this = this;
        // return this.http.post('/api/dates', newDate, this.jwt())
        // return this.http.post('http://localhost:8888/spendTrackerService/api/addDate?date=myDateString&userId=' + newDate["userId"] + '&Authorization=' + this.jwtString(), newDate, this.jwt() )
        return this.http.post('http://localhost:8888/spendTrackerService/api/addDate?date=' + newDate["date"] + '&userId=' + newDate["userId"] + '&Authorization=' + this.jwtString(), newDate, this.jwt())
            .map(function (response) {
            console.log("dates.service :: addDate ", response);
            var log = {};
            log['type'] = _this.log.DATE_CREATE;
            log['data'] = {};
            log['data']['user'] = JSON.parse(localStorage.getItem("currentUser"));
            log['data']['newDate'] = newDate;
            log['data']['date'] = new Date();
            _this.log.record(log);
            return response;
        });
    };
    DatesService.prototype.dateSort = function (dates) {
        dates.sort(function (a, b) { return a.date - b.date; });
    };
    DatesService.prototype.getDateById = function (id) {
        // return this.http.get('/api/dates/getDateById/'+ id, this.jwt())
        // return this.http.get('http://localhost:8888/spendTrackerService/api/getDateById?id=' + id + '&Authorization=' + this.jwtString(), id, this.jwt())
        return this.http.get('http://localhost:8888/spendTrackerService/api/getDateById?id=' + id + '&Authorization=' + this.jwtString())
            .map(function (response) {
            // Translate the server side response into app model structure
            var responseParsed = new spend_date_1.SpendDate();
            responseParsed['id'] = response.json().Id;
            responseParsed['date'] = response.json().Date;
            return responseParsed;
        });
    };
    return DatesService;
}(jwt_service_1.JwtService));
DatesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        log_service_1.LogService])
], DatesService);
exports.DatesService = DatesService;
//# sourceMappingURL=dates.service.js.map