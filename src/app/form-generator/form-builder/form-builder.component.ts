import { Component, OnInit } from '@angular/core';
import { FormGeneratorService, FormConfig, FormField } from '../form-generator.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  forms: FormConfig[] = [];
  currentForm: FormConfig | null = null;
  isCreatingForm = false;
  newFormData = { name: '', title: '', description: '' };
  showFieldEditor = false;
  selectedField: FormField | null = null;
  editingFieldIndex = -1;

  fieldTypes = [
    'text', 'email', 'password', 'number', 'checkbox',
    'radio', 'select', 'textarea', 'date', 'file'
  ];

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnInit(): void {
    this.formGeneratorService.forms$.subscribe(forms => {
      this.forms = forms;
    });

    this.formGeneratorService.currentForm$.subscribe(form => {
      this.currentForm = form;
    });
  }

  createNewForm(): void {
    if (this.newFormData.name && this.newFormData.title) {
      const form = this.formGeneratorService.createNewForm(
        this.newFormData.name,
        this.newFormData.title,
        this.newFormData.description
      );
      this.formGeneratorService.setCurrentForm(form);
      this.newFormData = { name: '', title: '', description: '' };
      this.isCreatingForm = false;
    }
  }

  loadForm(form: FormConfig): void {
    this.formGeneratorService.setCurrentForm({ ...form });
  }

  saveCurrentForm(): void {
    if (this.currentForm) {
      this.formGeneratorService.saveForm(this.currentForm);
      alert('Form saved successfully!');
    }
  }

  deleteForm(formId: string): void {
    if (confirm('Are you sure you want to delete this form?')) {
      this.formGeneratorService.deleteForm(formId);
      if (this.currentForm?.id === formId) {
        this.currentForm = null;
      }
    }
  }

  addNewField(): void {
    this.selectedField = {
      id: 'field_' + Math.random().toString(36).substr(2, 9),
      type: 'text',
      label: '',
      placeholder: '',
      required: false
    };
    this.editingFieldIndex = -1;
    this.showFieldEditor = true;
  }

  editField(field: FormField, index: number): void {
    this.selectedField = { ...field };
    this.editingFieldIndex = index;
    this.showFieldEditor = true;
  }

  saveField(): void {
    if (this.selectedField && this.selectedField.label) {
      if (this.editingFieldIndex > -1 && this.currentForm) {
        this.currentForm.fields[this.editingFieldIndex] = this.selectedField;
        this.currentForm.updatedAt = new Date();
      } else if (this.currentForm) {
        this.formGeneratorService.addField(this.selectedField);
      }
      this.closeFieldEditor();
    } else {
      alert('Please enter a field label');
    }
  }

  deleteField(index: number): void {
    if (this.currentForm && confirm('Delete this field?')) {
      this.currentForm.fields.splice(index, 1);
      this.currentForm.updatedAt = new Date();
    }
  }

  closeFieldEditor(): void {
    this.showFieldEditor = false;
    this.selectedField = null;
    this.editingFieldIndex = -1;
  }

  moveFieldUp(index: number): void {
    if (this.currentForm && index > 0) {
      const temp = this.currentForm.fields[index];
      this.currentForm.fields[index] = this.currentForm.fields[index - 1];
      this.currentForm.fields[index - 1] = temp;
      this.currentForm.updatedAt = new Date();
    }
  }

  moveFieldDown(index: number): void {
    if (this.currentForm && index < this.currentForm.fields.length - 1) {
      const temp = this.currentForm.fields[index];
      this.currentForm.fields[index] = this.currentForm.fields[index + 1];
      this.currentForm.fields[index + 1] = temp;
      this.currentForm.updatedAt = new Date();
    }
  }

  exportForm(): void {
    if (this.currentForm) {
      const json = this.formGeneratorService.exportFormAsJson(this.currentForm);
      const blob = new Blob([json], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.currentForm.name}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  importForm(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const form = this.formGeneratorService.importFormFromJson(e.target.result);
          this.formGeneratorService.setCurrentForm(form);
          this.formGeneratorService.saveForm(form);
        } catch (error) {
          alert('Error importing form');
        }
      };
      reader.readAsText(file);
    }
  }

  addOption(): void {
    if (this.selectedField && this.selectedField.options === undefined) {
      this.selectedField.options = [''];
    } else if (this.selectedField?.options) {
      this.selectedField.options.push('');
    }
  }

  removeOption(index: number): void {
    if (this.selectedField?.options) {
      this.selectedField.options.splice(index, 1);
    }
  }
}
