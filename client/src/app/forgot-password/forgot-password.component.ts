import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  ForgotPasswordForm = this.fb.group({
    email: ['', Validators.required]
  });
  get email() { return this.ForgotPasswordForm.get('email'); }

  onSubmit(){
    console.log(this.ForgotPasswordForm.value)
    this._auth.forgotPassword(this.ForgotPasswordForm.value)
    .subscribe(result=>{
      this._router.navigate(['/login'])
    },
    err=>{
      console.log(err)
    })
  }
}
