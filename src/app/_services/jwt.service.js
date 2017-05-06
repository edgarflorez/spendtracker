"use strict";
var http_1 = require("@angular/http");
var JwtService = (function () {
    function JwtService() {
    }
    JwtService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    JwtService.prototype.jwtString = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            return 'Bearer ' + currentUser.token;
        }
    };
    return JwtService;
}());
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map