import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutPageComponent {
  public products: Product[] = [];
  public totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.products.reduce((total, product) => total + product.price, 0);
  }

  removeProduct(index: number): void {
    this.products.splice(index, 1);  // Elimina el producto de la lista
    this.calculateTotalPrice();      // Recalcula el precio total
  }

  cardName: string = '';
  orderPlaced: boolean = false;
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';
  orderMessage: string = '';
  orderId: string = '';

  isCardValid() {
    return this.cardName !== '' && this.cardNumber.length === 16 && this.cardExpiry.length === 5 && this.cardCVV.length === 3;
  }

  placeOrder() {
    if (this.isCardValid()) {
      this.orderMessage = 'Colocando orden...';
      this.orderPlaced = false;

      // Simular procesamiento de la orden
      setTimeout(() => {
        this.orderId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        this.orderMessage = `Orden colocada exitosamente. ID de orden: ${this.orderId}`;
        this.orderPlaced = true;
      }, 3000);
    } else {
      this.orderMessage = "Por favor, complete todos los datos de la tarjeta correctamente.";
    }
  }
}
