import {Injectable, SkipSelf} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomerModel} from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerServiceService {

  private baseUrl = 'http://localhost:8085/api/v1/customers/';
  private authUrl = 'http://localhost:8085/authenticate';

  constructor(private httpClient: HttpClient) {
  }
  authCustomer(customer: CustomerModel): Promise<any> {
    let authRequest = {username: customer.email, password: customer.password};
    return new Promise(((resolve, reject) => {
      this.httpClient.post<any>(`${this.authUrl}`, authRequest).subscribe(
        result => {
          resolve(result);
        },
        error => {
          reject(`Your email or password is incorrect`);
        }
      );
    }));
  }

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

  updateCustomer(customer: CustomerModel): Promise<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return new Promise<any>(((resolve, reject) => {
      this.httpClient.put<CustomerModel>(`${this.baseUrl}${customer.id}`, JSON.stringify(customer), {headers}).subscribe(
        result => {
          resolve(result);
        },
        error => {
          reject('Old customer was not found');
        }
      );
    }));
  }

  addCustomer(customer: CustomerModel): Promise<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return new Promise((resolve, reject) => {
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
