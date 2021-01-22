import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsesComponent } from './responses.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '', component: ResponsesComponent,
  }
];

@NgModule({
  declarations: [ResponsesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class ResponsesModule { }
