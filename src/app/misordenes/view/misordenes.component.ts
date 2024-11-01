import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { UserService } from '../../auth/service/user.service';
import { AuthService } from '../../auth/service/auth.service';

interface Orden {
  id: string;
  fechaCreacion: Date;
  total: number;
  productos: any[];
}

@Component({
  selector: 'app-misordenes',
  templateUrl: './misordenes.component.html',
  styleUrl: './misordenes.component.css'
})
export class MisordenesComponent implements OnInit{
  ordenes: Orden[] = [];
  userName: string | undefined;

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.user$.pipe(take(1)).subscribe(user => {
      this.userName = user?.name;
      const userId = user?.uid;

      if (userId) {
        this.firestore.collection<Orden>('ordenes', ref => ref.where('usuarioId', '==', userId))
          .valueChanges({ idField: 'id' })
          .pipe(take(1))
          .subscribe(ordenes => {
            this.ordenes = ordenes;
          });
      }
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

  verDetalles(orden: Orden) {
    console.log("Detalles de la orden:", orden);
  }


}
