import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'date' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select, radio
  value?: string;
  validation?: string;
  helpText?: string;
  maxLength?: number;
  minLength?: number;
}

export interface FormConfig {
  id: string;
  name: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitButtonText: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  private formsSubject = new BehaviorSubject<FormConfig[]>([]);
  public forms$ = this.formsSubject.asObservable();

  private currentFormSubject = new BehaviorSubject<FormConfig | null>(null);
  public currentForm$ = this.currentFormSubject.asObservable();

  constructor() {
    this.loadFormsFromLocalStorage();
  }

  createNewForm(name: string, title: string, description: string = ''): FormConfig {
    const form: FormConfig = {
      id: this.generateId(),
      name,
      title,
      description,
      fields: [],
      submitButtonText: 'Submit',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return form;
  }

  setCurrentForm(form: FormConfig): void {
    this.currentFormSubject.next(form);
  }

  getCurrentForm(): FormConfig | null {
    return this.currentFormSubject.value;
  }

  addField(field: FormField): void {
    const currentForm = this.currentFormSubject.value;
    if (currentForm) {
      currentForm.fields.push(field);
      currentForm.updatedAt = new Date();
      this.currentFormSubject.next({ ...currentForm });
    }
  }

  updateField(fieldId: string, updatedField: FormField): void {
    const currentForm = this.currentFormSubject.value;
    if (currentForm) {
      const fieldIndex = currentForm.fields.findIndex(f => f.id === fieldId);
      if (fieldIndex > -1) {
        currentForm.fields[fieldIndex] = updatedField;
        currentForm.updatedAt = new Date();
        this.currentFormSubject.next({ ...currentForm });
      }
    }
  }

  removeField(fieldId: string): void {
    const currentForm = this.currentFormSubject.value;
    if (currentForm) {
      currentForm.fields = currentForm.fields.filter(f => f.id !== fieldId);
      currentForm.updatedAt = new Date();
      this.currentFormSubject.next({ ...currentForm });
    }
  }

  reorderFields(fields: FormField[]): void {
    const currentForm = this.currentFormSubject.value;
    if (currentForm) {
      currentForm.fields = fields;
      currentForm.updatedAt = new Date();
      this.currentFormSubject.next({ ...currentForm });
    }
  }

  saveForm(form: FormConfig): void {
    const forms = this.formsSubject.value;
    const existingIndex = forms.findIndex(f => f.id === form.id);

    form.updatedAt = new Date();

    if (existingIndex > -1) {
      forms[existingIndex] = form;
    } else {
      forms.push(form);
    }

    this.formsSubject.next([...forms]);
    this.saveFormsToLocalStorage();
  }

  getAllForms(): FormConfig[] {
    return this.formsSubject.value;
  }

  deleteForm(formId: string): void {
    const forms = this.formsSubject.value.filter(f => f.id !== formId);
    this.formsSubject.next([...forms]);
    this.saveFormsToLocalStorage();
  }

  exportFormAsJson(form: FormConfig): string {
    return JSON.stringify(form, null, 2);
  }

  importFormFromJson(jsonString: string): FormConfig {
    try {
      const form = JSON.parse(jsonString);
      form.id = this.generateId();
      form.createdAt = new Date();
      form.updatedAt = new Date();
      return form;
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  }

  private saveFormsToLocalStorage(): void {
    localStorage.setItem('forms', JSON.stringify(this.formsSubject.value));
  }

  private loadFormsFromLocalStorage(): void {
    const stored = localStorage.getItem('forms');
    if (stored) {
      try {
        this.formsSubject.next(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading forms from storage', error);
      }
    }
  }

  private generateId(): string {
    return 'form_' + Math.random().toString(36).substr(2, 9);
  }
}
