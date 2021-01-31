import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseModel} from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseServiceService {
  private baseUrl = 'http://localhost:8085/api/v1/responses/';
  private unregisteredCustomerUrl = 'http://localhost:8085/api/v1/unregisteredCustomers/';

  constructor(private http: HttpClient) { }

  getResponses(customerId: number): Observable<ResponseModel[]> {
    return this.http.get<ResponseModel[]>(`${this.baseUrl}byCustomerId?id=${customerId}`);
  }

  saveResponse(response: ResponseModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.unregisteredCustomerUrl}response`, response);
  }
}
