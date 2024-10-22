import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
})
export class ListProduct{
  @Input()
  public productList: Product[] = [{
    name: 'Iphone X',
    brand: 'Apple',
    type: 'Celular',
    price: 6500
  }];

  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter();

  onDeleteProduct(id?: string): void {
    if(!id) return;
    this.onDelete.emit(id);
  }

}
