import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../customer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  public id: string;
  private data=[];
  serverError: any;
  constructor(private _router:Router, private activatedRoute:ActivatedRoute,  private customerService:CustomerService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.customerService.getSingleCustomer(this.id).subscribe(
      res=>{
        console.log(res)
        this.data = res.customer
        this.customerForm.patchValue({
            name:res.customer.name,
            email: res.customer.email,
            mobile: res.customer.mobile,
            address: res.customer.address,
        });
      },
      err =>{
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 404) {
            this.serverError = err.error.message
          }
          if (err.status === 500) {
            this.serverError = 'Unauthorization Error plz logout and login again'
          }
        }
      }
    )
    //console.log(this.id)
  }
  customerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    address: ['', Validators.required]
  });


  updateCustomer(){
    console.log(this.customerForm.value)
    console.log("id is: "+this.id)
    this.customerService.updateCustomer(this.id, this.customerForm.value).subscribe(
      res=>{
        this._router.navigate(['/customers/customerlist'])
      },
      err=>{
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 404) {
            this.serverError = err.error.message
          }
          if (err.status === 500) {
            this.serverError = 'Unauthorization Error plz logout and login again'
          }
        }
      }
    )
  }
  get name() { return this.customerForm.get('name'); }
  get email() { return this.customerForm.get('email'); }
  get mobile() { return this.customerForm.get('mobile'); }
  get address() { return this.customerForm.get('address'); }
}
