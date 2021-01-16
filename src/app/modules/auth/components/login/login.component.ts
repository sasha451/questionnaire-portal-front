import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerModel} from '../../../../models/customer.model';
import {AuthFormService} from '../../services/auth-form.service';
import {Router} from '@angular/router';

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
              private authService: AuthFormService,
              private router: Router) {
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
    this.authService.loginCustomer(customer)
      .then(response => {
        localStorage.clear();
        localStorage.setItem('customer_info', JSON.stringify(response));
        // this.router.navigate(['fields']); // Todo
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
