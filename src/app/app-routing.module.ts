import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'form-generator',
    loadChildren: () => import('./form-generator/form-generator.module').then(m => m.FormGeneratorModule)
  },
  { path: '', redirectTo: '/form-generator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
