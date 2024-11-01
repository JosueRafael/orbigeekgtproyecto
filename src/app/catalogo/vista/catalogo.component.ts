import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from '../catalogo.interface';
import { UserService } from '../../auth/service/user.service';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CarritoService } from '../../carrito.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  userName: string | undefined;

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private carritoService: CarritoService // Inyecta el CarritoService
  ) {}

  ngOnInit() {
    this.obtenerProductos();
    this.userService.user$.pipe(take(1)).subscribe(user => {
      this.userName = user?.name;
      console.log('Usuario en CatalogoComponent:', user);
      console.log('Nombre del usuario:', this.userName);
    });
  }

  obtenerProductos() {
    this.firestore.collection('productos').snapshotChanges().subscribe(data => {
      this.productos = data.map(producto => {
        const data = producto.payload.doc.data() as Producto;
        const id = producto.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto); // Llama al método del servicio
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
