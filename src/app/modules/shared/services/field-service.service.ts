import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FieldModel} from '../../../models/field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldServiceService {
  private baseUrl = 'http://localhost:8085/api/v1/fields/';

  constructor(private http: HttpClient) { }

  getFields(customerId: number): Observable<FieldModel[]> {
    return this.http.get<FieldModel[]>(`${this.baseUrl}byCustomerId?id=${customerId}`);
  }

  deleteField(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}
