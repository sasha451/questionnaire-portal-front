import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerModel} from '../../../../models/customer.model';
import {CustomerServiceService} from '../../../../services/customer-service.service';
import {EncrDecrService} from "../../../../services/encr-decr-service.service";

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
              private customerService: CustomerServiceService,
              private EncrDecr: EncrDecrService) {
    this.oldCustomer = JSON.parse(localStorage.getItem('customer_info') as string);
  }

  public onSubmit(): void {
    const answer = this.profileFormGroup.value;
    let oldPassword = this.EncrDecr.get('123456$#@$^@1ERF', this.oldCustomer.password);
    const customer: CustomerModel = {id: this.oldCustomer.id, email: answer.email, password: oldPassword,
      firstName: answer.firstName, lastName: answer.lastName, phoneNumber: answer.phoneNumber};
    this.customerService.updateCustomer(customer)
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
