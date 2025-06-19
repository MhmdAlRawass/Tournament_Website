import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // login() {
  //   this.auth.login(this.username, this.password).subscribe({
  //     next: (res) => {
  //       this.auth.setToken(res.token);
  //       if (this.auth.isAdmin()) {
  //         this.router.navigate(['/admin/dashboard']);
  //       } else {
  //         this.error = 'Access denied: Not an admin';
  //       }
  //     },
  //     error: () => {
  //       this.error = 'Login failed. Check your credentials.';
  //     },
  //   });
  // }

  onLogin() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please enter username and password', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.loading = true;

    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (res) => {
          this.loading = false;

          this.authService.setToken(res.token);
          console.log(res.token);
          const token = localStorage.getItem('auth_token');
          if (token) {
            console.log(
              'Decoded Token:',
              JSON.parse(atob(token.split('.')[1]))
            );
          }

          this.snackBar.open('Login Successful', 'Close', {
            duration: 3000,
          });

          this.router.navigate([`admin/admins`]);
        },
        error: (err) => {
          this.loading = false;

          this.snackBar.open(
            'Login failed. Please check credentials.',
            'Close',
            {
              duration: 3000,
            }
          );

          console.error('Login error:', err);
        },
      });
  }
}
