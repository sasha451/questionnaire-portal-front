import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SuccessPageComponent } from './components/success-page/success-page.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      {path: '', redirectTo: 'editProfile'},
      {path: 'editProfile', component: EditProfileComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
      {path: 'successSaved', component: SuccessPageComponent}
    ]
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    SuccessPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
