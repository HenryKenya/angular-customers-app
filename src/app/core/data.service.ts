import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICustomer, IOrder } from '../../app/shared/interfaces';

@Injectable()
export class DataService {

    baseUrl:string = 'assets/';

    constructor() {}

    private handleError = (error: any) => {
        console.log(`server error: ${error}`)

        if(error.error instanceof Error) {

            const errMessage = error.error.message;

            return Observable.throw(errMessage);
            

        }
        return Observable.throw(error || 'Node.js servor error');
    }
}