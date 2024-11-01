import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../carrito.service';
import { UserService } from '../../../auth/service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';

interface CarritoItem {
  id: string;
  producto: any;
  cantidad: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carrito: CarritoItem[] = [];
  userName: string | undefined;
  cardName: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';
  ordenExitosa: boolean = false;
  ordenId: string | null = null;

  constructor(private carritoService: CarritoService,
    private firestore: AngularFirestore,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
    });
    this.userService.user$.pipe(take(1)).subscribe(user => {
      this.userName = user?.name;
      console.log('Usuario en Checkout:', user);
      console.log('Nombre del usuario:', this.userName);
    });
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => {
      return total + (item.producto.precio * item.cantidad);
    }, 0);
  }

  incrementarCantidad(item: CarritoItem) {
    this.carritoService.actualizarCantidad(item, item.cantidad + 1);
  }

  decrementarCantidad(item: CarritoItem) {
    if (item.cantidad > 1) {
      this.carritoService.actualizarCantidad(item, item.cantidad - 1);
    } else {
      this.eliminarDelCarrito(item);
    }
  }
  get totalAPagar(): number {
    return this.carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  eliminarDelCarrito(item: CarritoItem) {
    this.carritoService.eliminarProducto(item); // Cambiar aquí para usar el objeto completo
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


  ordenar() {
    const camposVacios = !this.cardName || !this.cardNumber || !this.cardExpiry || !this.cardCVV;
    const carritoVacio = this.carrito.length === 0;

    if (camposVacios && carritoVacio) {
      alert('Por favor, complete todos los campos de la tarjeta de crédito y asegúrese de que hay productos en el carrito para ordenar.');
      return;
    } else if (carritoVacio) {
      alert('No hay productos en el carrito para ordenar.');
      return;
    }

    this.userService.user$.pipe(take(1)).subscribe(user => {
      const userId = user ? user.uid : null;

      const orden = {
        usuarioId: userId,
        productos: this.carrito.map(item => ({
          id: item.producto.id,
          nombre: item.producto.nombre,
          cantidad: item.cantidad,
          precio: item.producto.precio
        })),
        total: this.totalAPagar,
        fechaCreacion: new Date()
      };

      this.firestore.collection('ordenes').add(orden)
      .then(docRef => {
        this.ordenExitosa = true;
        this.ordenId = docRef.id;

        this.carrito.forEach(item => {
          const nuevoStock = item.producto.cantidad - item.cantidad;
          this.firestore.collection('productos').doc(item.producto.id).update({
            cantidad: nuevoStock >= 0 ? nuevoStock : 0
          }).catch(error => console.error(`Error al actualizar el stock del producto ${item.producto.nombre}:`, error));
        });


        this.carritoService.vaciarCarrito();
      })
        .catch(error => {
          console.error('Error al realizar la orden:', error);
        });
    });
  }

  cerrarMensaje() {
    this.ordenExitosa = false;
    this.ordenId = null;
    this.router.navigate(['/catalogo']);
  }
}
