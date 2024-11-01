import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-registry-page',
  templateUrl: './registry-page.component.html',
  styleUrls: ['./registry-page.component.css']
})
export class RegistryPageComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  confirmPassword: string = '';
  confirmPasswordVisible: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;

  hasUpperCase: boolean = false;
  hasLowerCase: boolean = false;
  hasNumber: boolean = false;
  hasMinLength: boolean = false;
  router: any;

  constructor(private authService: AuthService) {}


  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.name && this.email && this.password) {
      this.authService.register(this.email, this.password, this.name)
        .then(() => {
          this.successMessage = 'Usuario registrado exitosamente.';
          this.errorMessage = '';
          this.resetForm();
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.hasUpperCase = false;
    this.hasLowerCase = false;
    this.hasNumber = false;
    this.hasMinLength = false;
  }

  validatePassword() {
    const password = this.password;

    this.hasUpperCase = /[A-Z]/.test(password);   // Al menos una mayúscula
    this.hasLowerCase = /[a-z]/.test(password);   // Al menos una minúscula
    this.hasNumber = /[0-9]/.test(password);      // Al menos un número
    this.hasMinLength = password.length >= 8;     // Longitud mínima de 8 caracteres
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('contrasena') as HTMLInputElement;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    const confirmPasswordInput = document.getElementById('contrasena-confirm') as HTMLInputElement;
    confirmPasswordInput.type = this.confirmPasswordVisible ? 'text' : 'password';
  }

}
