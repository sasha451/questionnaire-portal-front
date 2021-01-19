import { Component, OnInit } from '@angular/core';
import {ResponseModel} from '../../models/response.model';
import {ResponseServiceService} from '../shared/services/response-service.service';
import {RxUnsubscribe} from '../../classes/rx-unsubscribe';
import {takeUntil} from 'rxjs/operators';
import {FieldModel} from '../../models/field.model';
import {FieldServiceService} from '../shared/services/field-service.service';
import {ResponseEntryModel} from '../../models/responseEntry.model';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent extends RxUnsubscribe implements OnInit {
  // @ts-ignore
  responses: ResponseModel[];
  // @ts-ignore
  fields: FieldModel[];
  // @ts-ignore
  customerId: number;
  constructor(private responseService: ResponseServiceService,
              private fieldService: FieldServiceService) {
    super();
  }

  ngOnInit(): void {
    this.customerId = JSON.parse(localStorage.getItem('customer_info') as string).id;
    this.loadResponses(this.customerId);
    this.loadFields(this.customerId);
  }

  answerWillBe(field: FieldModel, responseEntries: ResponseEntryModel[]): boolean {
    let length = responseEntries.length;
    let returnValue = false;
    responseEntries.forEach((responseEntry, index) => {
      if (responseEntry.fieldId === field.id) {
        returnValue = true;
      }
    });
    return returnValue;
  }

  getAnswer(field: FieldModel, responseEntries: ResponseEntryModel[]): string {
    let length = responseEntries.length;
    let returnValue = '';
    responseEntries.forEach((responseEntry, index) => {
      if (responseEntry.fieldId === field.id) {
        returnValue = responseEntry.responseEntryValue
      }
    });
    return returnValue;
  }


  loadResponses(customerId: number): void {
    this.responseService.getResponses(customerId)
      .pipe(
        takeUntil((this.destroy$))
      )
      .subscribe(
        (responseArray: ResponseModel[]) => {
          this.responses = responseArray;
        }
      );
  }

  loadFields(customerId: number): void {
    this.fieldService.getFields(customerId)
      .pipe(
        takeUntil((this.destroy$))
      )
      .subscribe(
        (fieldsArray: FieldModel[]) => {
          this.fields = fieldsArray;
        }
      );
  }
}
