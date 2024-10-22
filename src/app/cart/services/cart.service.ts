import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  public products: Product[] = [{
    id: uuid(),
    name: 'Iphone X',
    brand: 'Apple',
    type: 'Celular',
    price: 6500
  },{
    id: uuid(),
    name: 'Vivobook X150',
    brand: 'Asus',
    type: 'Laptop',
    price: 4200
  }];

  addProduct(product: Product): void {
    const newProduct: Product = {id: uuid(), ...product};
    this.products.push(newProduct);
  }

  deleteProductById(id:string){
    this.products = this.products.filter(product => product.id != id);
  }

  getProducts(): Product[] {
    return this.products;
  }

}
