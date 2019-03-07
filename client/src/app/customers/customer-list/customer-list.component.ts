import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private listItems=[];
  private serverError='';
  p: number = 1;
  constructor(private _router:Router, private customerService: CustomerService, ) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.customerService.getAllCustomer()
    .subscribe(
      res => {
        console.log(res)
        this.listItems = res.result.customer;
        console.log(this.listItems);
      },
      err => {  console.log(err)
                if( err instanceof HttpErrorResponse ) {
                  if (err.status === 409) {
                    this.serverError = err.error.message
                  }
                  if (err.status === 401) {
                    this.serverError = 'Unauthorization Error plz logout and login again'
                  }
                }
            }
    )
  }
  deleteCustomer(id){
    console.log(id);
    this.customerService.deleteCustomer(id).subscribe(
      res=> {
        this.fetchData();
      },
      err => {
        if (err.status === 500) {
          console.log(err)
          this.serverError = err.error
        }else{
          console.log('Unknown error please check you input and try again');
        }
      }
  )
  }

}
