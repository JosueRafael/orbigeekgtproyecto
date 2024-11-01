import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminProductosComponent } from './pages/admin-productos.component';

@NgModule({
  declarations: [
    AdminProductosComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AdminProductosModule { }
