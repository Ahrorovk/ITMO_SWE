import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      fullName: ['', [Validators.required]],
      groupNumber: ['', [Validators.required]],
      variant: [88, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      if (this.loginForm.valid) {
        this.errorMessage = '';
        this.authService.login(this.loginForm.value).subscribe({
          next: (response) => {
            console.log('LoginComponent: Response:', response);

            // Даем время на сохранение токена
            setTimeout(() => {
              const token = this.authService.getToken();
              if (!token) {
                this.errorMessage = 'Ошибка сохранения токена';
                return;
              }
              this.router.navigate(['/main']);
            }, 200);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Ошибка входа';
            if (!this.authService.isAuthenticated()) {
              console.log('LoginComponent: No token saved (as expected for error)');
            }
          }
        });
      }
    } else {
      if (this.registerForm.valid) {
        this.errorMessage = '';
        this.authService.register(this.registerForm.value).subscribe({
          next: (response) => {
            console.log('LoginComponent: Response:', response);
            
            // Даем время на сохранение токена
            setTimeout(() => {
              const token = this.authService.getToken();
              if (!token) {
                this.errorMessage = 'Ошибка сохранения токена';
                return;
              }
              console.log('LoginComponent: Token in localStorage:', token.substring(0, 20) + '...');
              this.router.navigate(['/main']);
            }, 200);
          },
          error: (err) => {
            console.error('LoginComponent: Registration error', err);
            this.errorMessage = err.error?.message || 'Ошибка регистрации';
            if (!this.authService.isAuthenticated()) {
              console.log('LoginComponent: No token saved (as expected for error)');
            }
          }
        });
      }
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }
}


