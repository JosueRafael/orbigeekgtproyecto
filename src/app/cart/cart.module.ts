import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainPageComponent } from './pages/main-page.component';
import { ListProduct } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CheckoutPageComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ListProduct,
    AddProductComponent,
    CheckoutPageComponent
  ],
  exports: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class CartModule { }
