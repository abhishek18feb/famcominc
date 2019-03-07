import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private _router: Router,private customerService: CustomerService) { }

  ngOnInit() {
  }

  customerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    address: ['', Validators.required]
  });
  get name() { return this.customerForm.get('name'); }
  get email() { return this.customerForm.get('email'); }
  get mobile() { return this.customerForm.get('mobile'); }
  get address() { return this.customerForm.get('address'); }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.customerForm.value);
    this.customerService.addCustomer(this.customerForm.value)
    .subscribe(
      res => {

        this._router.navigate(['/customers/customerlist'])
      },
      err => console.log(err)
    )
  }
}
