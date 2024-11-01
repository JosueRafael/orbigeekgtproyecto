import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminPageComponent } from './mainpage/admin-page.component';

@NgModule({
  declarations: [
    AdminPageComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AdminPageModule { }
