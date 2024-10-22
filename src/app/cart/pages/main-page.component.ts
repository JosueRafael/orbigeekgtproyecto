import { Component } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})

export class MainPageComponent {
  constructor(private cartService: CartService){}

  get products(): Product[] {
    return [...this.cartService.products];
  }

  onDeleteProduct(id: string): void {
    this.cartService.deleteProductById(id);
  }

  onNewProduct(product: Product): void {
    this.cartService.addProduct(product);
  }
}
