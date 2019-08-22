import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICustomer, IOrder } from '../../app/shared/interfaces';

@Injectable()
export class DataService {

    baseUrl:string = 'assets/';

    constructor( private http: HttpClient ) {}


    // get all customers
    getCustomers() : Observable<ICustomer[]>{

        return this.http.get<ICustomer[]>(`${this.baseUrl}customers.json`)
                .pipe(
                    catchError(this.handleError)
                );

    }

    // get single customer
    getCustomer(id: number) : Observable<ICustomer> {

        return this.http.get<ICustomer[]>(`${this.baseUrl}customers.json`)
                .pipe(
                    map(customers => {
                        let customer = customers.filter((cust : ICustomer) => cust.id === id);
                        return (customer && customer.length) ? customer[0] : null;
                    }),
                    catchError(this.handleError)

                )

    }

    // get filtered orders
    getOrders(id: number) : Observable<IOrder[]> {
        return this.http.get<IOrder[]>(this.baseUrl + 'orders.json')
          .pipe(
            map(orders => {
              let custOrders = orders.filter((order: IOrder) => order.customerId === id);
              return custOrders;
            }),
            catchError(this.handleError)
          );
      }


    // handle errors in response 
    private handleError = (error: any) => {
        console.log(`server error: ${error}`)

        if(error.error instanceof Error) {

            const errMessage = error.error.message;

            return Observable.throw(errMessage);
            

        }
        return Observable.throw(error || 'Node.js servor error');
    }
}