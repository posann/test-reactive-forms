import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-reactive-form-app');

  formData: FormGroup;
  names: string[];


  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]]
    });

    this.names = [];
  }

  onSubmit(): void {
    if (this.formData.valid) {
      const checkExists = this.names.includes(this.formData.value.name);
      if (!checkExists) {
        this.names.push(this.formData.value.name);
        this.formData.reset();
      } else {
        this.formData.markAllAsTouched();
        alert('Name already exists in the list.');
      }
    } else {
      this.formData.markAllAsTouched();
      alert('Form is invalid. Please correct the errors and try again.');
    }
  }

  onDeleteName(index: number): void {
    this.names.splice(index, 1);
  }

}
