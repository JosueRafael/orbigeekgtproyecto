import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {

  @Output()
  public onNewProduct: EventEmitter<Product> = new EventEmitter();

  public product: Product = {
    name: '',
    brand: '',
    type: '',
    price: 0
  };

  emitProduct():void{
    if ( this.product.name.length == 0 ) return;
    this.onNewProduct.emit(this.product);
    this.product = {name: '', brand: '', type: '', price: 0};
  }

}
