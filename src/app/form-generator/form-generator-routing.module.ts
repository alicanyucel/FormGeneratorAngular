import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGeneratorComponent } from './form-generator.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: FormGeneratorComponent,
    children: [
      { path: 'builder', component: FormBuilderComponent },
      { path: 'viewer', component: FormViewerComponent },
      { path: '', redirectTo: 'builder', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormGeneratorRoutingModule { }
