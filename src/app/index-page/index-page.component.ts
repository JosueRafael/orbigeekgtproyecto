import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { UserService } from '../auth/service/user.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})

export class IndexPageComponent implements OnInit {
  userName: string | undefined;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.userName = user?.name;
    });
  }

  onLogout() {
    this.authService.logout().then(() => {
      alert('Sesión cerrada con éxito');
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
  }
}
