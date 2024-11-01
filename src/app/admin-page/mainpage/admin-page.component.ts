import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../../auth/service/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']

})
export class AdminPageComponent implements OnInit{
  userName: string | undefined;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userService.user$.pipe(take(1)).subscribe(user => {
      this.userName = user?.name;
      console.log('Usuario en CatalogoComponent:', user);
      console.log('Nombre del usuario:', this.userName);
    });
  }

  onLogout() {
    this.authService.logout().then(() => {
      alert('Sesión cerrada con éxito');
      this.router.navigate(['/catalogo']);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
  }
}
