"use strict";
var http_1 = require("@angular/http");
var testing_1 = require("@angular/http/testing");
exports.fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: http_1.Http,
    useFactory: function (backend, options, realBackend) {
        // If the user localStorage is not defined initialize the values
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', '[{ "firstName": "edgarf",  "lastName": "florez",   "username": "edgarf",   "password": "12345",    "id": 1}, { "firstName": "cindy",   "lastName": "cordero",  "username": "cindyc",   "password": "12345",    "id": 2}, { "firstName": "John",   "lastName": "Doe",  "username": "a",   "password": "a",    "id": 3}]');
        }
        if (!localStorage.getItem('categories')) {
            localStorage.setItem('categories', '[{ "id": "1", "categoryName": "Alimentacion"},{ "id": "2", "categoryName": "Creditos"},{ "id": "3", "categoryName": "Otros Gastos"},{ "id": "4", "categoryName": "Seguro Vida"},{ "id": "5", "categoryName": "Servicios"},{ "id": "6", "categoryName": "Trasporte"},{ "id": "7", "categoryName": "Vivienda"}]');
        }
        // array in local storage for registered users
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var dates = JSON.parse(localStorage.getItem('dates')) || [];
        var spends = JSON.parse(localStorage.getItem('spends')) || [];
        var categories = JSON.parse(localStorage.getItem('categories')) || [];
        // configure fake backend
        backend.connections.subscribe(function (connection) {
            // wrap in timeout to simulate server api call
            setTimeout(function () {
                // authenticate
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === http_1.RequestMethod.Post) {
                    // get parameters from post request
                    var params_1 = JSON.parse(connection.request.getBody());
                    // find if any user matches login credentials
                    var filteredUsers = users.filter(function (user) {
                        return user.username === params_1.username && user.password === params_1.password;
                    });
                    if (filteredUsers.length) {
                        // if login details are valid return 200 OK with user details and fake jwt token
                        var user = filteredUsers[0];
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                            status: 200,
                            body: {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                token: 'fake-jwt-token'
                            }
                        })));
                    }
                    else {
                        // else return 400 bad request
                        connection.mockError(new Error('Username or password is incorrect'));
                    }
                    return;
                }
                // get users
                if (connection.request.url.endsWith('/api/users') && connection.request.method === http_1.RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: users })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === http_1.RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        var urlParts = connection.request.url.split('/');
                        var id_1 = parseInt(urlParts[urlParts.length - 1]);
                        var matchedUsers = users.filter(function (user) { return user.id === id_1; });
                        var user = matchedUsers.length ? matchedUsers[0] : null;
                        // respond 200 OK with user
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: user })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // create user
                if (connection.request.url.endsWith('/api/users') && connection.request.method === http_1.RequestMethod.Post) {
                    // get new user object from post body
                    var newUser_1 = JSON.parse(connection.request.getBody());
                    // validation
                    var duplicateUser = users.filter(function (user) { return user.username === newUser_1.username; }).length;
                    if (duplicateUser) {
                        return connection.mockError(new Error('Username "' + newUser_1.username + '" is already taken'));
                    }
                    // save new user
                    newUser_1.id = users.length + 1;
                    users.push(newUser_1);
                    localStorage.setItem('users', JSON.stringify(users));
                    // respond 200 OK
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200 })));
                    return;
                }
                // delete user
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === http_1.RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        var urlParts = connection.request.url.split('/');
                        var id = parseInt(urlParts[urlParts.length - 1]);
                        for (var i_1 = 0; i_1 < users.length; i_1++) {
                            var user = users[i_1];
                            if (user.id === id) {
                                // delete user
                                users.splice(i_1, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }
                        // respond 200 OK
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200 })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // dates getDates
                if (connection.request.url.match(/\/api\/dates\/getDates\/\d+$/) && connection.request.method === http_1.RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find dates by userid in dates array
                        var urlParts = connection.request.url.split('/');
                        var id_2 = parseInt(urlParts[urlParts.length - 1]);
                        var matchedDates = dates.filter(function (date) { return date.userId === id_2; });
                        console.log('fake-backend :: service api/dates/' + id_2);
                        // respond 200 OK with user
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: matchedDates })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // dates addDate
                if (connection.request.url.endsWith('/api/dates') && connection.request.method === http_1.RequestMethod.Post) {
                    // get new user object from post body
                    var newDate_1 = JSON.parse(connection.request.getBody());
                    if (newDate_1.date === '') {
                        return connection.mockError(new Error('ERROR :: Please select a date'));
                    }
                    // Validate duplicated dates for the user
                    var duplicateDate = dates.filter(function (date) { return date.userId === newDate_1.userId && date.date === newDate_1.date; });
                    console.log("duplicateDate ::: ", duplicateDate);
                    if (duplicateDate.length > 0) {
                        return connection.mockError(new Error('ERROR :: Date duplicated "' + newDate_1.date + '" is already taken'));
                    }
                    // save new user
                    newDate_1.id = dates.length + 1;
                    dates.push(newDate_1);
                    localStorage.setItem('dates', JSON.stringify(dates));
                    // respond 200 OK
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200 })));
                    return;
                }
                // dates getDateById
                if (connection.request.url.match(/\/api\/dates\/getDateById\/\d+$/) && connection.request.method === http_1.RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find the date info with the dateid
                        var urlParts = connection.request.url.split('/');
                        var id_3 = parseInt(urlParts[urlParts.length - 1]);
                        var matchedDates = dates.filter(function (date) { return date.id === id_3; });
                        console.log('fake-backend :: service api/getDateById/' + id_3);
                        // respond 200 OK with user
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: matchedDates[0] })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // spends addSpend
                if (connection.request.url.endsWith('/api/spends') && connection.request.method === http_1.RequestMethod.Post) {
                    // get new user object from post body
                    var newSpend_1 = JSON.parse(connection.request.getBody());
                    // return category name within the service
                    var categoryName = categories.filter(function (category) { return newSpend_1.category === category.id; });
                    newSpend_1.categoryName = categoryName[0]['categoryName'];
                    // save new spend
                    newSpend_1.id = spends.length + 1;
                    spends.push(newSpend_1);
                    localStorage.setItem('spends', JSON.stringify(spends));
                    // respond 200 OK
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200 })));
                    return;
                }
                // spends updateSpend
                if (connection.request.url.endsWith('/api/spends/update') && connection.request.method === http_1.RequestMethod.Post) {
                    // get new user object from post body
                    var newSpend_2 = JSON.parse(connection.request.getBody());
                    // return category name within the service
                    var categoryName = categories.filter(function (category) { return newSpend_2.category === category.id; });
                    newSpend_2.categoryName = categoryName[0]['categoryName'];
                    // update new spend
                    for (var i = spends.length - 1; i >= 0; i--) {
                        if (spends[i]['id'] == newSpend_2.id) {
                            spends[i] = newSpend_2;
                        }
                    }
                    ;
                    localStorage.setItem('spends', JSON.stringify(spends));
                    // respond 200 OK
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200 })));
                    return;
                }
                // spends getSpendsByDate
                if (connection.request.url.match(/\/api\/spends\/getSpendsByDate\/\d+$/) && connection.request.method === http_1.RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find spends by dateId in spends array
                        var urlParts = connection.request.url.split('/');
                        var dateId_1 = parseInt(urlParts[urlParts.length - 1]);
                        var matchedSpends = spends.filter(function (spend) { return +spend.date === +dateId_1; });
                        console.log("matchedSpends :::: ", "id :" + dateId_1, matchedSpends);
                        console.log('fake-backend :: service api/getSpendsByDate/' + dateId_1);
                        // respond 200 OK with user
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: matchedSpends })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // spends getSpendById
                if (connection.request.url.match(/\/api\/spends\/getSpendById\/\d+$/) && connection.request.method === http_1.RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find spend by spendId in spends array
                        var urlParts = connection.request.url.split('/');
                        var spendId_1 = parseInt(urlParts[urlParts.length - 1]);
                        var matchedSpends = spends.filter(function (spend) { return spend.id === spendId_1; });
                        console.log('fake-backend :: service api/spends/getSpendById/' + spendId_1);
                        // respond 200 OK with user
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: matchedSpends[0] })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // spend 
                if (connection.request.url.match(/\/api\/spends\/\d+$/) && connection.request.method === http_1.RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        var urlParts = connection.request.url.split('/');
                        var id = parseInt(urlParts[urlParts.length - 1]);
                        for (var i_2 = 0; i_2 < spends.length; i_2++) {
                            var spend = spends[i_2];
                            if (spend.id === id) {
                                // delete spend
                                spends.splice(i_2, 1);
                                localStorage.setItem('spends', JSON.stringify(spends));
                                break;
                            }
                        }
                        console.log('fake-backend  :: delete : service api/spends/' + id);
                        // respond 200 OK
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200 })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // getCategories
                if (connection.request.url.endsWith('/api/categories') && connection.request.method === http_1.RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        var body = JSON.parse(localStorage.getItem('categories'));
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: body })));
                    }
                    else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 401 })));
                    }
                    return;
                }
                // pass through any requests not handled above
                var realHttp = new http_1.Http(realBackend, options);
                var requestOptions = new http_1.RequestOptions({
                    method: connection.request.method,
                    headers: connection.request.headers,
                    body: connection.request.getBody(),
                    url: connection.request.url,
                    withCredentials: connection.request.withCredentials,
                    responseType: connection.request.responseType
                });
                realHttp.request(connection.request.url, requestOptions)
                    .subscribe(function (response) {
                    connection.mockRespond(response);
                }, function (error) {
                    connection.mockError(error);
                });
            }, 500);
        });
        return new http_1.Http(backend, options);
    },
    deps: [testing_1.MockBackend, http_1.BaseRequestOptions, http_1.XHRBackend]
};
//# sourceMappingURL=fake-backend.js.map