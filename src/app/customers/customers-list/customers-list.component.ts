import { Component, OnInit, Input,  } from '@angular/core';

import { ICustomer } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html'
})

export class CustomersListComponent implements OnInit {

    private _customers: ICustomer[] = [];
    
    @Input() get customers() : ICustomer[] {
        return this._customers
    }

    set customers(value: ICustomer[]) {
        if(value) {
            this.filteredCustomers = this._customers = value
            this.calculateOrders()
        }
    }

    filteredCustomers: ICustomer[] = [];
    customersOrderTotal: number;
    currencyCode: string = "Ksh";
   
    constructor() {}
    
    ngOnInit(){ 

        
    }

    

    // calculate orders
    calculateOrders = () => {

        this.customersOrderTotal = 0;

        this.filteredCustomers.forEach( (customer: ICustomer) => {
                this.customersOrderTotal += customer.orderTotal
        })
    }

    
    sort = (prop: string) => {
        // sorter service will handle sorting
    }
}