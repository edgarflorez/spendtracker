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
var categories_service_1 = require("./categories.service");
var log_service_1 = require("./log.service");
var SpendsService = (function (_super) {
    __extends(SpendsService, _super);
    // Constructor
    function SpendsService(categoriesService, http, log) {
        var _this = _super.call(this) || this;
        _this.categoriesService = categoriesService;
        _this.http = http;
        _this.log = log;
        return _this;
    }
    // Public Methods
    SpendsService.prototype.getSpendsByDate = function (id) {
        return this.http.get('/api/spends/getSpendsByDate/' + id, this.jwt())
            .map(function (response) {
            console.log('spends.service :: getSpendsByDate ', response['_body']);
            return response['_body'];
        });
    };
    SpendsService.prototype.getSpendById = function (id) {
        return this.http.get('/api/spends/getSpendById/' + id, this.jwt())
            .map(function (response) {
            console.log('spends.service :: getSpendById ', response['_body']);
            return response['_body'];
        });
    };
    SpendsService.prototype.addSpend = function (spend) {
        var _this = this;
        return this.http.post('/api/spends', spend, this.jwt())
            .map(function (response) {
            console.log('spends.service :: addSpend ', response['_body']);
            _this.log.record({ 'type': _this.log.SPEND_CREATE, 'data': { 'user': JSON.parse(localStorage.getItem('currentUser')), 'spend': spend, 'date': new Date() } });
            return response;
        });
    };
    SpendsService.prototype.deleteSpend = function (spendId) {
        var _this = this;
        return this.http.delete('/api/spends/' + spendId, this.jwt())
            .map(function (response) {
            console.log('spends.service :: deleteSpend ', response['_body']);
            _this.log.record({ 'type': _this.log.SPEND_DELETE, 'data': { 'user': JSON.parse(localStorage.getItem('currentUser')), 'spendId': spendId, 'spendData': response['_body'], 'date': new Date() } });
            return response;
        });
    };
    SpendsService.prototype.updateSpend = function (spend) {
        var _this = this;
        return this.http.post('/api/spends/update', spend, this.jwt())
            .map(function (response) {
            console.log('spends.service :: updateSpend ', response['_body']);
            _this.log.record({ 'type': _this.log.SPEND_UPDATE, 'data': { 'user': JSON.parse(localStorage.getItem('currentUser')), 'spend': spend, 'date': new Date() } });
            return response;
        });
    };
    return SpendsService;
}(jwt_service_1.JwtService));
SpendsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        http_1.Http,
        log_service_1.LogService])
], SpendsService);
exports.SpendsService = SpendsService;
//# sourceMappingURL=spends.service.js.map