import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbButtonsModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '', component: QuestionnaireComponent,
  }
];

@NgModule({
  declarations: [QuestionnaireComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbButtonsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuestionnaireModule { }
