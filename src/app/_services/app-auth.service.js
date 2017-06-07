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
require("rxjs/add/operator/map");
var log_service_1 = require("./log.service");
var AppAuthService = (function () {
    // Constructor
    function AppAuthService(http, log) {
        this.http = http;
        this.log = log;
    }
    // Public Methods
    AppAuthService.prototype.login = function (username, password) {
        var _this = this;
        // return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password}))
        var headers = new http_1.Headers({ 'dataType': 'jsonp' });
        var options = new http_1.RequestOptions({ headers: headers });
        // return this.http.post('http://localhost:8888/spendTrackerService/api/authenticate/?password=' + password + '&username=' + username , JSON.stringify({ username: username, password: password}), options  ) 
        return this.http.post('http://localhost:8888/spendTrackerService/api/authenticate?username=' + username + '&password=' + password, JSON.stringify({ username: username, password: password }), options)
            .map(function (response) {
            // login sussessful if there's a jwt token in response
            // Translate the server side response into the app model structure
            var user = {};
            user['id'] = response.json().Id;
            user['username'] = response.json().Username;
            user['firstName'] = response.json().FirstName;
            user['lastName'] = response.json().Lastname;
            user['username'] = response.json().Username;
            user['token'] = response.json().token;
            // let user = response.json();
            if (user && user['token']) {
                // store user details and jwt token in local storage to keep the user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            var log = {};
            log['type'] = _this.log.LOGIN;
            log['data'] = {};
            log['data']['user'] = JSON.parse(localStorage.getItem("currentUser"));
            log['data']['date'] = new Date();
            _this.log.record(log);
        });
    };
    AppAuthService.prototype.logout = function () {
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            var log = {};
            log['type'] = this.log.LOGOUT;
            log['data'] = {};
            log['data']['user'] = JSON.parse(localStorage.getItem("currentUser"));
            log['data']['date'] = new Date();
            this.log.record(log);
        }
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    return AppAuthService;
}());
AppAuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        log_service_1.LogService])
], AppAuthService);
exports.AppAuthService = AppAuthService;
//# sourceMappingURL=app-auth.service.js.map