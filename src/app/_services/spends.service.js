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
var mock_spends_1 = require("../mock/mock.spends");
var categories_service_1 = require("./categories.service");
var SpendsService = (function () {
    function SpendsService(categoriesService, http) {
        this.categoriesService = categoriesService;
        this.http = http;
    }
    // getSpendsByDate_old(id: number): Promise<SpendModel[]>  {
    // 	let filterSpends: SpendModel[] = [];
    // 	for (let i = 0; i < SPENDS.length; i++) {
    // 		if(SPENDS[i].date == id){
    // 			filterSpends.push(SPENDS[i]);
    // 		}
    // 	};
    // 	return Promise.resolve( filterSpends );
    // }
    SpendsService.prototype.getSpendsByDate = function (id) {
        return this.http.get('/api/spends/getSpendsByDate/' + id, this.jwt())
            .map(function (response) {
            console.log('spends.service :: getSpendsByDate ', response['_body']);
            return response['_body'];
        });
    };
    SpendsService.prototype.getSpendById = function (id) {
        var filterSpend;
        for (var i = 0; i < mock_spends_1.SPENDS.length; i++) {
            if (mock_spends_1.SPENDS[i].id == id) {
                filterSpend = JSON.parse(JSON.stringify(mock_spends_1.SPENDS[i]));
            }
        }
        ;
        return Promise.resolve(filterSpend);
    };
    // addSpend_old(spend:SpendModel): Promise<any> {
    // 	return this.categoriesService.getCategoryById( spend.category ).then( categoryName => {
    // 		spend.id = SPENDS.length + 1;
    // 		spend.categoryName = categoryName;
    // 		SPENDS.push(spend);
    // 		let response: Object = {}
    // 		response['type'] = 200;
    // 		response['data'] = "Spend created sucessfully";
    // 		return Promise.resolve( response );	
    // 	})
    // }
    SpendsService.prototype.addSpend = function (spend) {
        return this.http.post('/api/spends', spend, this.jwt())
            .map(function (response) {
            console.log('spends.service :: addSpend ', response['_body']);
            return response;
        });
    };
    SpendsService.prototype.dropSpend = function (spendId) {
        console.log("A", mock_spends_1.SPENDS);
        for (var i = mock_spends_1.SPENDS.length - 1; i >= 0; i--) {
            if (spendId == mock_spends_1.SPENDS[i].id) {
                mock_spends_1.SPENDS.splice(i, 1);
            }
        }
        ;
        console.log("B", mock_spends_1.SPENDS);
        var response = {};
        response['type'] = 200;
        response['data'] = "Spend created sucessfully";
        return Promise.resolve(response);
    };
    // updateSpend_old(spend:SpendModel): Promise<any> {
    // 	return this.categoriesService.getCategoryById( spend.category ).then( categoryName => {
    // 		spend.categoryName = categoryName;
    // 		for (let i = 0; i < SPENDS.length; i++) {
    // 			if( spend.id ==  SPENDS[i].id){
    // 				SPENDS[i] = spend
    // 			}
    // 		};
    // 		let response: Object = {}
    // 		response['type'] = 200;
    // 		response['data'] = "Spend created sucessfully";
    // 		return Promise.resolve( response );	
    // 	})
    // }
    SpendsService.prototype.updateSpend = function (spend) {
        return this.http.post('/api/spends/update', spend, this.jwt())
            .map(function (response) {
            console.log('spends.service :: updateSpend ', response['_body']);
            return response;
        });
    };
    // private helper methods
    SpendsService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return SpendsService;
}());
SpendsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        http_1.Http])
], SpendsService);
exports.SpendsService = SpendsService;
//# sourceMappingURL=spends.service.js.map