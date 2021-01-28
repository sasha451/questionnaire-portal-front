import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FieldsComponent } from './fields.component';
import {SharedModule} from '../shared/shared.module';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { AddFieldComponent } from './components/add-field/add-field.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';

const routes: Routes = [
  {
    path: '', component: FieldsComponent,
    children: [
    ]
  }
];

@NgModule({
  declarations: [FieldsComponent, AddFieldComponent, EditFieldComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ]
})
export class FieldsModule { }
