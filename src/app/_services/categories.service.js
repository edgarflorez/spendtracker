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
var spend_category_1 = require("../_models/spend-category");
var CategoriesService = (function (_super) {
    __extends(CategoriesService, _super);
    // Constructor
    function CategoriesService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    // Public Methods
    CategoriesService.prototype.getCategories = function () {
        var data = {
            'Authorization': this.jwtString()
        };
        var headers = new http_1.Headers({ 'params': JSON.stringify(data) });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8888/spendTrackerService/api/getCategories', options)
            .map(function (response) {
            var responseParsed = [];
            for (var _i = 0, _a = response.json(); _i < _a.length; _i++) {
                var entry = _a[_i];
                var tempArray = new spend_category_1.SpendCategory();
                tempArray['id'] = entry.Id;
                tempArray['categoryName'] = entry.CategoryName;
                responseParsed.push(tempArray);
            }
            console.log('categories.service :: getCategories ', responseParsed);
            return responseParsed;
            // return response['_body'];
        });
    };
    return CategoriesService;
}(jwt_service_1.JwtService));
CategoriesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map