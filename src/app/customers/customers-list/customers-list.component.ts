import { Component, OnInit, Input,  } from '@angular/core';

import { ICustomer } from 'src/app/shared/interfaces';
import { SorterService } from 'src/app/core/sorter.service';

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
   
    constructor( private sorterService: SorterService ) {}
    
    ngOnInit(){ 

        
    }

    

    // calculate orders
    calculateOrders = () => {

        this.customersOrderTotal = 0;

        this.filteredCustomers.forEach( (customer: ICustomer) => {
                this.customersOrderTotal += customer.orderTotal
        })
    }

    // filter customers
    filter = (data: string) => {
        if(data) {
            this.filteredCustomers = this.customers.filter( (cust : ICustomer) => {
                return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       cust.orderTotal.toString().indexOf(data.toLowerCase()) > -1
            });
            
           

        } else {
            this.filteredCustomers = this.customers;
        }
        
        this.calculateOrders(); // call function to calculate orders again 
    }

    
    sort = (prop: string) => {
        this.sorterService.sort(this.filteredCustomers, prop);
    }
}