import { Component, OnInit } from '@angular/core';
import {FieldModel} from '../../models/field.model';
import {RxUnsubscribe} from '../../classes/rx-unsubscribe';
import {FieldServiceService} from '../shared/services/field-service.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent extends RxUnsubscribe implements OnInit {
  // @ts-ignore
  fields: FieldModel[];
  // @ts-ignore
  customerId: number;
  // @ts-ignore
  private bodyText: string;

  constructor(private fieldService: FieldServiceService) {
    super();
  }

  ngOnInit(): void {
    this.customerId = JSON.parse(localStorage.getItem('customer_info') as string).id;
    this.loadFields(this.customerId);
  }

  deleteField(id: number): void {
    this.fieldService.deleteField(id).subscribe(() => {
      this.loadFields(this.customerId);
    });
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
