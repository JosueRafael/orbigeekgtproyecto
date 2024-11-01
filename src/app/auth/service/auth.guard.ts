import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Asegúrate de la ruta correcta
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.user$.pipe(
      map(user => {
        if (user) {
          return true; // Permitir acceso si hay un usuario
        } else {
          this.router.navigate(['/login']); // Redirigir a login si no hay usuario
          return false;
        }
      })
    );
  }
}
