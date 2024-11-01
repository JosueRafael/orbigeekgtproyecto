import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './catalogo/catalogo.interface';

interface CarritoItem {
  id: string;
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: CarritoItem[] = [];
  private carritoSubject = new BehaviorSubject<CarritoItem[]>(this.carrito);
  public carrito$ = this.carritoSubject.asObservable();

  agregarProducto(producto: Producto) {
    if (!producto.id) {
      console.error('El producto no tiene un ID definido.');
      return;
    }

    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.carrito.push({ id: producto.id, producto, cantidad: 1 });
    }

    this.carritoSubject.next(this.carrito);
  }

  eliminarProducto(item: CarritoItem) {
    const index = this.carrito.findIndex(p => p.id === item.id);
    if (index > -1) {
      this.carrito.splice(index, 1);
      this.carritoSubject.next(this.carrito);
    }
  }


  actualizarCantidad(item: CarritoItem, nuevaCantidad: number) {
    const index = this.carrito.findIndex(p => p.id === item.id);

    if (index > -1) {
      const cantidadActual = this.carrito[index].cantidad;

      if (nuevaCantidad < 1) {
        this.eliminarProducto(item);
      } else {
        this.carrito[index].cantidad = nuevaCantidad;
        this.carritoSubject.next(this.carrito);
      }
    }
  }

  vaciarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }

}
