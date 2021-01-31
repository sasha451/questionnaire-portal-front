import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FieldModel} from '../models/field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldServiceService {
  private baseUrl = 'http://localhost:8085/api/v1/fields/';
  private unregisteredCustomerUrl = 'http://localhost:8085/api/v1/unregisteredCustomers/';

  constructor(private http: HttpClient) { }

  getFields(customerId: number): Observable<FieldModel[]> {
    return this.http.get<FieldModel[]>(`${this.unregisteredCustomerUrl}byCustomerId?id=${customerId}`);
  }

  updateField(fieldModel: FieldModel) {
    return this.http.put<FieldModel>(`${this.baseUrl}${fieldModel.id}`, fieldModel);
  }

  deleteField(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

  saveField(fieldModel: FieldModel): Observable<FieldModel> {
    return this.http.post<FieldModel>(`${this.baseUrl}`, fieldModel);
  }
}
