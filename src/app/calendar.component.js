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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dates_service_1 = require("./_services/dates.service");
var user_service_1 = require("./_services/user.service");
var app_alert_1 = require("./utils/app.alert");
var CalendarComponent = (function () {
    // Constructor
    function CalendarComponent(datesService, appAlert, userService) {
        this.datesService = datesService;
        this.appAlert = appAlert;
        this.userService = userService;
        // Vars
        this.addDate = false;
        this.newDateFormatted = '';
        this.newDateJSDate = '';
        this.myDatePickerOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: true,
            disableUntil: { year: 2016, month: 8, day: 10 },
            selectionTxtFontSize: '12px'
        };
    }
    // ngOnInit
    CalendarComponent.prototype.ngOnInit = function () {
        this.getDates();
        console.log("Calendar Init");
    };
    // Private Functions
    CalendarComponent.prototype.getDates = function () {
        var _this = this;
        this.datesService.getDates(this.userService.getCurrentUserId())
            .subscribe(function (data) {
            console.log("DATA :: ", data);
            _this.dates = data;
        }, function (error) {
            console.log(error.message);
        });
    };
    // Private Handlers
    CalendarComponent.prototype.onDateChanged = function (event) {
        this.newDateFormatted = event.formatted;
        this.newDateJSDate = event.jsdate;
    };
    CalendarComponent.prototype.onAddNewDate = function (event) {
        event.stopPropagation();
        this.newDateFormatted = '';
        this.newDateJSDate = '';
        this.addDate = true;
    };
    CalendarComponent.prototype.onCancelAddNewDate = function (event) {
        event.stopPropagation();
        this.addDate = false;
    };
    CalendarComponent.prototype.onSubmitAddNewDate = function (event) {
        var _this = this;
        event.stopPropagation();
        this.datesService.addDate({ 'id': 0, 'userId': this.userService.getCurrentUserId(), 'date': this.newDateJSDate })
            .subscribe(function (data) {
            _this.addDate = false;
            _this.getDates();
        }, function (error) {
            _this.addDate = false;
            _this.appAlert.alert(error.json().msg);
        });
    };
    return CalendarComponent;
}());
CalendarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'calendar',
        templateUrl: 'calendar.component.html'
    }),
    __metadata("design:paramtypes", [dates_service_1.DatesService,
        app_alert_1.AppAlert,
        user_service_1.UserService])
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map