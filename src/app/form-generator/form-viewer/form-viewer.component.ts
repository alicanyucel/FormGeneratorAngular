import { Component, OnInit } from '@angular/core';
import { FormGeneratorService, FormConfig } from '../form-generator.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

interface LengthError {
  requiredLength: number;
  actualLength: number;
}

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

    const group: Record<string, FormControl> = {};

    this.selectedForm.fields.forEach(field => {
      const validators: ValidatorFn[] = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (typeof field.minLength === 'number') {
        validators.push(Validators.minLength(field.minLength));
      }

      if (typeof field.maxLength === 'number') {
        validators.push(Validators.maxLength(field.maxLength));
      }

      if (field.validation) {
        validators.push(Validators.pattern(field.validation));
      }

      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      group[field.id] = new FormControl('', validators);
    });

    this.form = new FormGroup(group);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.submissionData = this.form.value;
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

    if (!control || !this.submitted) return '';

    if (control.hasError('required')) {
      return `${field?.label} is required`;
    }

    const minErr = control.getError('minlength') as LengthError | null;
    if (minErr) {
      return `${field?.label} must be at least ${minErr.requiredLength} characters`;
    }

    const maxErr = control.getError('maxlength') as LengthError | null;
    if (maxErr) {
      return `${field?.label} must not exceed ${maxErr.requiredLength} characters`;
    }

    if (control.hasError('email')) {
      return `${field?.label} must be a valid email address`;
    }

    if (control.hasError('pattern')) {
      return `${field?.label} format is invalid`;
    }

    return 'Invalid field';
  }

  isFieldInvalid(fieldId: string): boolean {
    const control = this.form.get(fieldId);
    return !!(control && control.invalid && this.submitted);
  }
}
