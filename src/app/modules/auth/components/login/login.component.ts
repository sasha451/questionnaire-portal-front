import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerModel} from '../../../../models/customer.model';
import {CustomerServiceService} from '../../../../services/customer-service.service';
import {Router} from '@angular/router';
import {EncrDecrService} from "../../../../services/encr-decr-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', Validators.required)
  });
  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerServiceService,
              private router: Router,
              private EncrDecr: EncrDecrService) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', Validators.required)
    });
  }

  public onSubmit(): void {
    const answer = this.loginFormGroup.value;
    const customer: CustomerModel = {id: 0, email: answer.email, password: answer.password, firstName: '', lastName: '', phoneNumber: ''};
    this.customerService.authCustomer(customer)
      .then(response => {
        localStorage.setItem('id_token', response.jwt);
      })
      .catch(error => {
        console.log(error.toString());
      });
    this.next(customer);
  }

  next(customer: CustomerModel): void {
    this.customerService.loginCustomer(customer)
      .then(response => {
        let plainPassword: String = response.password;
        response.password = this.EncrDecr.set('123456$#@$^@1ERF', plainPassword);
        localStorage.setItem('customer_info', JSON.stringify(response));
        this.router.navigate(['/fields']);
      })
      .catch(error => {
        console.log(error.toString());
      });
  }

  getEmailError(elemName: string): string {
    // @ts-ignore
    return this.loginFormGroup.get(elemName).hasError('email') ? 'Not a valid email' : '';
  }

  getRequiredError(elemName: string): string {
    // @ts-ignore
    return  this.loginFormGroup.get(elemName).hasError('required') ? 'You must enter a value' : '';
  }
}
