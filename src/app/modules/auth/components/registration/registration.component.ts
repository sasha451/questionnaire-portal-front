import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerServiceService} from '../../../shared/services/customer-service.service';
import {Router} from '@angular/router';
import {CustomerModel} from '../../../../models/customer.model';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationFormGroup: FormGroup = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', Validators.required)
  });
  constructor(private formBuilder: FormBuilder,
              private authService: CustomerServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.registrationFormGroup = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', Validators.required),
      confirmedPassword: this.formBuilder.control('', [Validators.required, RxwebValidators.compare({fieldName: 'password'})]),
      phoneNumber: this.formBuilder.control('', Validators.pattern('^[0-9\\-\\+]{9,15}$')),
      firstName: new FormControl(),
      lastName: new FormControl()
    });
  }

  public onSubmit(): void {
    const answer = this.registrationFormGroup.value;
    const customer: CustomerModel = {id: 0, email: answer.email, password: answer.password, firstName: answer.firstName,
      lastName: answer.lastName, phoneNumber: answer.phoneNumber};
    this.authService.addCustomer(customer)
      .then(response => {
        this.router.navigate(['auth/login']);
      })
      .catch(error => {
        console.log(error.toString());
      });
  }

  getEmailError(elemName: string): string {
    // @ts-ignore
    return this.registrationFormGroup.get(elemName).hasError('email') ? 'Not a valid email' : '';
  }

  getRequiredError(elemName: string): string {
    // @ts-ignore
    return  this.registrationFormGroup.get(elemName).hasError('required') ? 'You must enter a value' : '';
  }

  getPhoneNumberError(elemName: string): string {
    // @ts-ignore
    return this.registrationFormGroup.get(elemName).hasError('pattern') ? 'Wrong phone number format' : '';
  }

  getPasswordsEqualsError(): string {
    // @ts-ignore
    return this.registrationFormGroup.get('password').value === this.registrationFormGroup.get('confirmedPassword').value ? '' :
      'Passwords should be equal';
  }
}
