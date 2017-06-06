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
var LogService = (function (_super) {
    __extends(LogService, _super);
    // Construnctor
    function LogService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        // Service constants to track different services
        _this.LOGIN = "Log in";
        _this.LOGOUT = "Log out";
        _this.DATE_CREATE = "Date Create";
        _this.SPEND_CREATE = "Spend Create";
        _this.SPEND_DELETE = "Spend Delete";
        _this.SPEND_UPDATE = "Spend Update";
        return _this;
    }
    LogService.prototype.record = function (data) {
        var log = JSON.parse(localStorage.getItem('logUser' + JSON.parse(localStorage.getItem("currentUser")).id)) || [];
        var logData = JSON.stringify(data);
        log.push(logData);
        localStorage.setItem('logUser' + JSON.parse(localStorage.getItem("currentUser")).id, JSON.stringify(log));
    };
    LogService.prototype.recordBK = function (data) {
        console.log("************** ");
        console.log("-------- ", data);
        // console.log("LOG ", data);
        // this.http.post('/api/log', data)
        return this.http.post('http://localhost:8888/spendTrackerService/api/logApp?type=' + data.type + '&data' + data.data + '&Authorization=' + this.jwtString(), data, this.jwt())
            .map(function (response) {
            console.log("****************** ");
            console.log("RESPONSE");
            var log = JSON.parse(localStorage.getItem('log')) || [];
            // let logData = JSON.parse(response);
            var logData = "{'type':" + data.type + ",'data':" + data.data + "}";
            // save log data
            log.push(logData);
            localStorage.setItem('log', JSON.stringify(log));
            console.log('log.service :: Log ', response['_body']);
            return response;
        });
    };
    return LogService;
}(jwt_service_1.JwtService));
LogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map