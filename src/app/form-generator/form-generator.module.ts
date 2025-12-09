import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGeneratorRoutingModule } from './form-generator-routing.module';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';
import { FormGeneratorComponent } from './form-generator.component';
import { FormGeneratorService } from './form-generator.service';

@NgModule({
  declarations: [
    FormGeneratorComponent,
    FormBuilderComponent,
    FormViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormGeneratorRoutingModule
  ],
  providers: [FormGeneratorService]
})
export class FormGeneratorModule { }
