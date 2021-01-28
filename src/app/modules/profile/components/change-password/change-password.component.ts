import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerServiceService} from '../../../../services/customer-service.service';
import {Router} from '@angular/router';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {CustomerModel} from '../../../../models/customer.model';
import {EncrDecrService} from "../../../../services/encr-decr-service.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  // @ts-ignore
  passwordChangeFormGroup: FormGroup;
  oldCustomer: CustomerModel;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerServiceService,
              private router: Router,
              private EncrDecr: EncrDecrService) {
    this.oldCustomer = JSON.parse(localStorage.getItem('customer_info') as string);
  }

  ngOnInit(): void {
    this.passwordChangeFormGroup = this.formBuilder.group({
      password: this.formBuilder.control('', Validators.required),
      newPassword: this.formBuilder.control('', Validators.required),
      confirmedNewPassword: this.formBuilder.control('', [Validators.required,
        RxwebValidators.compare({fieldName: 'newPassword'})])
    }, this.passwordsMatchValidator);
  }

  public onSubmit(): void {
    const answer = this.passwordChangeFormGroup.value;
    const customer: CustomerModel = {
      id: this.oldCustomer.id, email: this.oldCustomer.email, password: answer.newPassword,
      firstName: this.oldCustomer.firstName, lastName: this.oldCustomer.lastName, phoneNumber: this.oldCustomer.phoneNumber
    };
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

  passwordsMatchValidator(form: FormGroup): boolean {
    let oldPassword = this.EncrDecr.get('123456$#@$^@1ERF', this.oldCustomer.password);
    if (oldPassword && this.passwordChangeFormGroup.get('password')) {
      // @ts-ignore
      return oldPassword === this.passwordChangeFormGroup.get('password').value ? false :
        {mismatch: true};
    }
    return false;
  }

  getPasswordsEqualsError(): string {
    // @ts-ignore
    return this.passwordChangeFormGroup.get('newPassword').value === this.passwordChangeFormGroup.get('confirmedNewPassword').value ? '' :
      'Passwords should be equal';
  }

  getRequiredError(elemName: string): string {
    // @ts-ignore
    return this.passwordChangeFormGroup.get(elemName).hasError('required') ? 'You must enter a value' : '';
  }
}
