import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../auth/service/auth.service';
import { UserService } from '../../auth/service/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  nombre: string = '';
  descripcion: string = '';
  cantidad: number | null = null;
  precio: number | null = null;
  categoria: string = '';
  mensaje: string = '';
  mensajeClass: string = '';

  productos: any[] = [];

  userName: string | undefined;

  constructor(private firestore: AngularFirestore, private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.firestore.collection('productos').snapshotChanges().subscribe(data => {
      this.productos = data.map(producto => {
        const data = producto.payload.doc.data() as object;
        const id = producto.payload.doc.id;
        return { id, ...data };
      });

    });
    this.userService.user$.pipe(take(1)).subscribe(user => {
      this.userName = user?.name;
      console.log('Usuario en CatalogoComponent:', user);
      console.log('Nombre del usuario:', this.userName);
    });
  }

  agregarProducto() {
    if (this.nombre && this.descripcion && this.cantidad !== null && this.precio !== null && this.categoria) {
      const producto = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        cantidad: this.cantidad,
        precio: this.precio,
        categoria: this.categoria,
        fecha: new Date()
      };

      this.firestore.collection('productos').add(producto)
        .then(() => {
          this.mensaje = 'Producto agregado exitosamente';
          this.mensajeClass = 'success';
          this.limpiarFormulario();
        })
        .catch(error => {
          this.mensaje = 'Error al agregar el producto';
          this.mensajeClass = 'error';
        });
    } else {
      this.mensaje = 'Por favor, completa todos los campos requeridos.';
      this.mensajeClass = 'error';
    }
  }

  editarProducto(producto: any) {

    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.cantidad = producto.cantidad;
    this.precio = producto.precio;
    this.categoria = producto.categoria;

    this.eliminarProducto(producto.id);
  }

  eliminarProducto(id: string) {
    this.firestore.collection('productos').doc(id).delete()
      .then(() => {
        console.log('Producto eliminado exitosamente');
        this.ngOnInit(); // Recargar productos después de la eliminación
      })
      .catch(error => {
        console.error('Error al eliminar el producto: ', error);
      });
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.cantidad = null;
    this.precio = null;
    this.categoria = '';
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
