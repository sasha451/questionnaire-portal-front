import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'fields',
    loadChildren: () => import('./modules/fields/fields.module').then(m => m.FieldsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'questionnaire/:id',
    loadChildren: () => import('./modules/questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./modules/shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: 'responses',
    loadChildren: () => import('./modules/responses/responses.module').then(m => m.ResponsesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
