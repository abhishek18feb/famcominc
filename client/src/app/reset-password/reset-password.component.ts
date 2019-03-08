import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router ,  private activatedRoute: ActivatedRoute) { }
  public token: string;
  ngOnInit() {
  }
  resetPasswordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {validator: PasswordValidation.MatchPassword})
  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

  onSubmit(){
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    this._auth.resetPassword(this.token, this.resetPasswordForm.value)
    .subscribe(result=>{
      this._router.navigate(['/login'])
    },
    err=>{
      console.log(err)
    })
  }

}
