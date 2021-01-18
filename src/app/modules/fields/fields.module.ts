import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FieldsComponent } from './fields.component';
import {SharedModule} from '../shared/shared.module';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '', component: FieldsComponent,
    children: [
    ]
  }
];

@NgModule({
  declarations: [FieldsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbDatepickerModule
  ]
})
export class FieldsModule { }
