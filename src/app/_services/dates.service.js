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
            return response['_body'];
        });
    };
    /*
    addDate_old(newDate: string): Promise<any>{
        let dateRepeated: boolean = false,
            dateA: Date,
            dateB: Date = new Date(newDate)
            ;
        // Check if the date exists
        for(let date of DATES){
            dateA = new Date(date.date);
            if(dateA.getTime() === dateB.getTime()){
                dateRepeated = true;
            }
        }
        // prepare response
        console.log("newDate", newDate);
        let response: Object = {}
        if(!dateRepeated){
            if(newDate == ""){
                response['type'] = 500;
                response['data'] = "ERROR PLEASE SELECT A DATE"
            }else{
                let newId = DATES.length + 1;
                DATES.push({id:newId, date: newDate });
                this.dateSort(DATES);
                response['type'] = 200;
                response['data'] = DATES;
            }
        }else{
            response['type'] = 500;
            response['data'] = "ERROR DATE DUPLICATED"
        }
        return Promise.resolve( response );
    }
    */
    DatesService.prototype.addDate = function (newDate) {
        return this.http.post('/api/dates', newDate, this.jwt())
            .map(function (response) {
            console.log("dates.service :: addDate ", response);
            return response;
        });
    };
    DatesService.prototype.dateSort = function (dates) {
        dates.sort(function (a, b) { return a.date - b.date; });
    };
    // getDateById_old(id:number): Promise<SpendDate>{
    // 	console.log('DATE ID :: ', id);
    // 	var date:SpendDate;
    // 	for (var i = 0; i < DATES.length; i++) {
    // 		if(DATES[i].id == id ){
    // 			date = DATES[i]
    // 		}	
    // 	};
    // 	return Promise.resolve( date );
    // }
    DatesService.prototype.getDateById = function (id) {
        return this.http.get('/api/dates/getDateById/' + id, this.jwt())
            .map(function (response) {
            return response['_body'];
        });
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