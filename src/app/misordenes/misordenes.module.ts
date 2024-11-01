import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MisordenesComponent } from './view/misordenes.component';

@NgModule({
  declarations: [
    MisordenesComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class MisordenesModule { }
