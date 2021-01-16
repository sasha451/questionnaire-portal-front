import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomerModel} from '../../../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFormService {

  private baseUrl = 'http://localhost:8085/api/v1/customers/';
  constructor(private httpClient: HttpClient) { }

  loginCustomer(customer: CustomerModel): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.httpClient.get<CustomerModel>(`${this.baseUrl}login?email=${customer.email}&password=${customer.password}`).subscribe(
        result => {
          resolve(result);
        },
        error => {
          reject(`Your email or password is incorrect`);
        }
      );
    }));
  }
}
