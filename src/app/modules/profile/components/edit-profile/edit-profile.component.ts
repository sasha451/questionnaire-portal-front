import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerModel} from '../../../../models/customer.model';
import {CustomerServiceService} from '../../../shared/services/customer-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  oldCustomer: CustomerModel;
  // @ts-ignore
  profileFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private customerService: CustomerServiceService) {
    this.oldCustomer = JSON.parse(localStorage.getItem('customer_info') as string);
  }

  public onSubmit(): void {
    const answer = this.profileFormGroup.value;
    const customer: CustomerModel = {id: this.oldCustomer.id, email: answer.email, password: this.oldCustomer.password,
      firstName: answer.firstName, lastName: answer.lastName, phoneNumber: answer.phoneNumber};
    this.customerService.updateCustomer(customer)
      .then(response => {
        localStorage.clear();
        localStorage.setItem('customer_info', JSON.stringify(response));
        this.router.navigate(['/fields']);
      })
      .catch(error => {
        console.log(error.toString());
      });
  }

  ngOnInit(): void {
    this.profileFormGroup = this.formBuilder.group({
      email: this.formBuilder.control(`${this.oldCustomer.email}`, [Validators.required, Validators.email]),
      phoneNumber: this.formBuilder.control(`${this.oldCustomer.phoneNumber}`, Validators.pattern('^[0-9\\-\\+]{9,15}$')),
      firstName: new FormControl(`${this.oldCustomer.firstName}`),
      lastName: new FormControl(`${this.oldCustomer.lastName}`)
    });
  }

  getEmailError(elemName: string): string {
    // @ts-ignore
    return this.profileFormGroup.get(elemName).hasError('email') ? 'Not a valid email' : '';
  }

  getRequiredError(elemName: string): string {
    // @ts-ignore
    return  this.profileFormGroup.get(elemName).hasError('required') ? 'You must enter a value' : '';
  }

  getPhoneNumberError(elemName: string): string {
    // @ts-ignore
    return this.profileFormGroup.get(elemName).hasError('pattern') ? 'Wrong phone number format' : '';
  }
}
