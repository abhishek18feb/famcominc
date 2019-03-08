import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }

  loginUser(userData){
    let result = JSON.stringify(userData)
    console.log(result)
    return this._http.post<any>('/api/users/login', JSON.parse(result));
  }

  registerUser(userData) {
    let result = JSON.stringify(userData)
    return this._http.post<any>('/api/users/signup', JSON.parse(result));
  }

  logoutUser() {
     localStorage.removeItem('token')
     this._router.navigate(['/login'])
   }

   getToken() {
     return localStorage.getItem('token')
   }

   loggedIn() {
     return !!localStorage.getItem('token')
   }
   forgotPassword(userData){
     return this._http.post<any>('/api/users/forgotPassword', userData)
   }
   resetPassword(token, userData){
     return this._http.post<any>('/api/users/resetPassword/'+token, userData)
   }
}
