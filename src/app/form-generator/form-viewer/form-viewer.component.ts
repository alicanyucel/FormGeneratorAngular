import { Component, OnInit } from '@angular/core';
import { FormGeneratorService, FormConfig, FormField } from '../form-generator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.css']
})
export class FormViewerComponent implements OnInit {
  forms: FormConfig[] = [];
  selectedForm: FormConfig | null = null;
  form!: FormGroup;
  submitted = false;
  submissionData: any = null;

  constructor(
    private formGeneratorService: FormGeneratorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGeneratorService.forms$.subscribe(forms => {
      this.forms = forms;
    });
  }

  loadForm(selectedForm: FormConfig): void {
    this.selectedForm = selectedForm;
    this.buildForm();
    this.submitted = false;
    this.submissionData = null;
  }

  buildForm(): void {
    if (!this.selectedForm) return;

    const group: any = {};
    this.selectedForm.fields.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }

      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }

      if (field.validation) {
        validators.push(Validators.pattern(field.validation));
      }

      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      group[field.id] = ['', validators];
    });

    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.submissionData = this.form.value;
      console.log('Form Data:', this.submissionData);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill in all required fields correctly');
    }
  }

  reset(): void {
    this.form.reset();
    this.submitted = false;
    this.submissionData = null;
  }

  getFieldError(fieldId: string): string {
    const control = this.form.get(fieldId);
    const field = this.selectedForm?.fields.find(f => f.id === fieldId);

    if (!control || !control.errors || !this.submitted) {
      return '';
    }

    if (control.errors['required']) {
      return `${field?.label} is required`;
    }
    if (control.errors['minlength']) {
      return `${field?.label} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['maxlength']) {
      return `${field?.label} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
    }
    if (control.errors['email']) {
      return `${field?.label} must be a valid email address`;
    }
    if (control.errors['pattern']) {
      return `${field?.label} format is invalid`;
    }

    return 'Invalid field';
  }

  isFieldInvalid(fieldId: string): boolean {
    const control = this.form.get(fieldId);
    return !!(control && control.invalid && this.submitted);
  }
}
