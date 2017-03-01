import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) => {
        // If the user localStorage is not defined initialize the values
        if(!localStorage.getItem('users')){
            localStorage.setItem('users', '[{ "firstName": "edgarf",  "lastName": "florez",   "username": "edgarf",   "password": "12345",    "id": 1}, { "firstName": "cindy",   "lastName": "cordero",  "username": "cindyc",   "password": "12345",    "id": 2}, { "firstName": "John",   "lastName": "Doe",  "username": "a",   "password": "a",    "id": 3}]')
        }
        if(!localStorage.getItem('categories')){
            localStorage.setItem('categories', '[{ "id": "1", "categoryName": "Alimentacion"},{ "id": "2", "categoryName": "Creditos"},{ "id": "3", "categoryName": "Otros Gastos"},{ "id": "4", "categoryName": "Seguro Vida"},{ "id": "5", "categoryName": "Servicios"},{ "id": "6", "categoryName": "Trasporte"},{ "id": "7", "categoryName": "Vivienda"}]')
        }


        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let dates: any[] = JSON.parse(localStorage.getItem('dates')) || [];
        let spends: any[] = JSON.parse(localStorage.getItem('spends')) || [];
        let categories: any[] = JSON.parse(localStorage.getItem('categories')) || [];

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return 200 OK with user details and fake jwt token
                        let user = filteredUsers[0];
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200,
                            body: {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                token: 'fake-jwt-token'
                            }
                        })));
                    } else {
                        // else return 400 bad request
                        connection.mockError(new Error('Username or password is incorrect'));
                    }

                    return;
                }

                // get users
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }

                    return;
                }

                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }

                    return;
                }

                // create user
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newUser = JSON.parse(connection.request.getBody());

                    // validation
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                    }

                    // save new user
                    newUser.id = users.length + 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // delete user
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }

                    return;
                }

                // dates getDates
                if (connection.request.url.match(/\/api\/dates\/getDates\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find dates by userid in dates array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedDates = dates.filter(date => { return date.userId === id } );

                        console.log('fake-backend :: service api/dates/'+id);

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedDates })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }

                // dates addDate
                if (connection.request.url.endsWith('/api/dates') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newDate = JSON.parse(connection.request.getBody());

                    if(newDate.date === ''){
                        return connection.mockError(new Error('ERROR :: Please select a date'));
                    }

                    // Validate duplicated dates for the user
                    let duplicateDate = dates.filter( date => { return date.userId === newDate.userId && date.date === newDate.date })
                    console.log("duplicateDate ::: ",duplicateDate);
                    if(duplicateDate.length > 0){
                        return connection.mockError(new Error('ERROR :: Date duplicated "' + newDate.date + '" is already taken'));
                    }

                    // save new user
                    newDate.id = dates.length + 1;
                    dates.push(newDate);
                    localStorage.setItem('dates', JSON.stringify(dates));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }
                // dates getDateById
                if (connection.request.url.match(/\/api\/dates\/getDateById\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find the date info with the dateid
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedDates = dates.filter(date => { return date.id === id } );

                        console.log('fake-backend :: service api/getDateById/'+id);

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedDates[0] })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }

                    return;
                }

                // spends addSpend
                if (connection.request.url.endsWith('/api/spends') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newSpend = JSON.parse(connection.request.getBody());

                    // return category name within the service
                    let categoryName = categories.filter( category => { return newSpend.category === category.id } ); 
                    newSpend.categoryName = categoryName[0]['categoryName']; 

                    // save new spend
                    newSpend.id = spends.length + 1;
                    spends.push(newSpend);
                    localStorage.setItem('spends', JSON.stringify(spends));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                 // spends updateSpend
                if (connection.request.url.endsWith('/api/spends/update') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newSpend = JSON.parse(connection.request.getBody());

                    // return category name within the service
                    let categoryName = categories.filter( category => { return newSpend.category === category.id } ); 
                    newSpend.categoryName = categoryName[0]['categoryName']; 

                    // update new spend
                    for (var i = spends.length - 1; i >= 0; i--) {
                        if(spends[i]['id'] == newSpend.id){
                            spends[i] = newSpend;
                        }
                    };
                    localStorage.setItem('spends', JSON.stringify(spends));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                    return;
                }

                // spends getSpendsByDate
                if (connection.request.url.match(/\/api\/spends\/getSpendsByDate\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find spends by dateId in spends array
                        let urlParts = connection.request.url.split('/');
                        let dateId = parseInt(urlParts[urlParts.length - 1]);
                        let matchedSpends = spends.filter(spend => { return +spend.date === +dateId } );

                        console.log("matchedSpends :::: ", "id :" +dateId , matchedSpends);

                        console.log('fake-backend :: service api/getSpendsByDate/'+dateId);

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedSpends })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }

                    return;
                }

                 // spends getSpendById
                if (connection.request.url.match(/\/api\/spends\/getSpendById\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find spend by spendId in spends array
                        let urlParts = connection.request.url.split('/');
                        let spendId = parseInt(urlParts[urlParts.length - 1]);
                        let matchedSpends = spends.filter(spend => { return spend.id === spendId } );

                        console.log('fake-backend :: service api/spends/getSpendById/'+spendId);

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedSpends[0] })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }

                    return;
                }
                // spend delete
                if (connection.request.url.match(/\/api\/spends\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let spendRemoved;
                        for (let i = 0; i < spends.length; i++) {
                            let spend = spends[i];
                            if (spend.id === id) {
                                spendRemoved = spend;
                                // delete spend
                                spends.splice(i, 1);
                                localStorage.setItem('spends', JSON.stringify(spends));
                                break;
                            }
                        }

                        console.log('fake-backend  :: delete : service api/spends/'+id);

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: spendRemoved })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }

                    return;
                }

                // getCategories
                if (connection.request.url.endsWith('/api/categories') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        let body = JSON.parse(localStorage.getItem('categories'));
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: body })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }

                // pass through any requests not handled above
                let realHttp = new Http(realBackend, options);
                let requestOptions = new RequestOptions({
                    method: connection.request.method,
                    headers: connection.request.headers,
                    body: connection.request.getBody(),
                    url: connection.request.url,
                    withCredentials: connection.request.withCredentials,
                    responseType: connection.request.responseType
                });
                realHttp.request(connection.request.url, requestOptions)
                    .subscribe((response: Response) => {
                        connection.mockRespond(response);
                    },
                    (error: any) => {
                        connection.mockError(error);
                    });

            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};