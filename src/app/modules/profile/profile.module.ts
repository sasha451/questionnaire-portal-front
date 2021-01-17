import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { EgitProfileComponent } from './components/egit-profile/egit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      {path: '', redirectTo: 'editProfile'},
      {path: 'editProfile', component: EgitProfileComponent},
      {path: 'changePassword', component: ChangePasswordComponent}
    ]
  }
];

@NgModule({
  declarations: [ProfileComponent, EgitProfileComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProfileModule { }
