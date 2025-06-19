import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../../services/auth.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register-admin-dialog',
  templateUrl: './register-admin-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class RegisterAdminDialogComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterAdminDialogComponent>,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const adminData = this.registerForm.value;
      const { username, password } = adminData;
      this.authService.register(username, password, 'admin').subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.dialogRef.close({ username, password });
        },
        error: (err) => {
          console.error('Error occurred during registration:', err);
          
          alert('Failed to register admin. Please try again.');
        },
      });
      console.log('Registering Admin:', adminData);
      this.dialogRef.close(adminData);
    }
  }
}
