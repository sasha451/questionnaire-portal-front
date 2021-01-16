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

  addCustomer(customer: CustomerModel): Promise<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return  new Promise((resolve, reject) => {
      this.httpClient.get<CustomerModel>(`${this.baseUrl}${customer.email}`).subscribe(
        result => {
          reject('That email is taken, please try another');
        },
        error => {
          this.httpClient.post<CustomerModel>(`${this.baseUrl}`, JSON.stringify(customer), {headers}).subscribe();
          resolve(customer);
        }
      );
    });
  }
}
