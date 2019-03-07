import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient, private _router: Router) { }

  addCustomer(customerData){
    let result = JSON.stringify(customerData)
    console.log(result)
    return this._http.post<any>('/api/customers', JSON.parse(result))
  }
  getAllCustomer(){
    return this._http.get<any>('api/customers')
  }
  deleteCustomer(id){
    return this._http.delete<any>('api/customers/'+id)
  }
  getSingleCustomer(id){
    return this._http.get<any>('api/customers/'+id)
  }
  updateCustomer(id, customerData){
    let result = JSON.stringify(customerData)
    console.log(result)
    return this._http.patch<any>('api/customers/'+id, JSON.parse(result))
  }
}
