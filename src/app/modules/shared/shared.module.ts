import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ]
})
export class SharedModule { }
