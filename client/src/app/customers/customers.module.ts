import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { TokenInterceptorService } from '../token-interceptor.service';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { CustomerService } from '../customer.service';

@NgModule({
  declarations: [CustomerListComponent, CustomerAddComponent, CustomerEditComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, CustomerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class CustomersModule { }
