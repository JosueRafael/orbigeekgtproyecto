import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
