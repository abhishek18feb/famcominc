import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router) { }

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
  }
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userForm.value);
    this._auth.registerUser(this.userForm.value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/customers/customerlist'])
      },
      err => console.log(err)
    )
  }
}
