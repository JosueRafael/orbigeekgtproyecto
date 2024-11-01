import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrotecnicoComponent } from './paginar/registrotecnico.component';

@NgModule({
  declarations: [
    RegistrotecnicoComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class RegistrotecnicoModule { }
