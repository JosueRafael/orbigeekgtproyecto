import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CatalogoComponent } from './vista/catalogo.component';

@NgModule({
  declarations: [
    CatalogoComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class CatalogoModule { }
