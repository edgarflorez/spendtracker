import { Injectable } from '@angular/core';

import { SpendDate } from '../types/spend-date'
import { DATES } from '../mock/mock.dates';

@Injectable()
export class DatesService {

	getDates(): Promise<SpendDate[]>{
		return Promise.resolve( DATES );
	}
	constructor() {}
}