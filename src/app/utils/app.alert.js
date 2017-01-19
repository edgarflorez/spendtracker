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
var AppAlert = (function () {
    function AppAlert() {
        this.initUI();
    }
    AppAlert.prototype.alert = function (message) {
        var _this = this;
        this.textNode.textContent = message;
        this.node.appendChild(this.textNode); // Append the text to <li>
        document.getElementsByTagName('body')[0].appendChild(this.node);
        // console.log(document.getElementsByTagName('body')[0]);
        // document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
        console.log(message);
        this.closeTimeout = setTimeout(function () {
            document.getElementsByTagName('body')[0].removeChild(_this.node);
            _this.node.removeChild(_this.textnode);
        }, 10000);
        this.initListeners();
    };
    AppAlert.prototype.initUI = function () {
        this.textNode = document.createTextNode(''); // Create a text node
        this.closeNode = document.createTextNode('X');
        this.close = document.createElement('div');
        this.close.className = 'app-alert-close';
        this.close.appendChild(this.closeNode);
        this.node = document.createElement('div'); // Create a <li> node
        this.node.className = 'app-alert alert alert-danger';
        this.node.appendChild(this.close);
    };
    AppAlert.prototype.initListeners = function () {
        var _this = this;
        this.close.addEventListener('click', function () {
            clearTimeout(_this.closeTimeout);
            document.getElementsByTagName('body')[0].removeChild(_this.node);
            _this.node.removeChild(_this.textnode);
        });
        ;
        document.getElementsByTagName('body')[0].addEventListener('click', function () {
            clearTimeout(_this.closeTimeout);
            document.getElementsByTagName('body')[0].removeChild(_this.node);
            _this.node.removeChild(_this.textnode);
        });
        ;
    };
    AppAlert = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppAlert);
    return AppAlert;
}());
exports.AppAlert = AppAlert;
//# sourceMappingURL=app.alert.js.map