import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserPageComponent } from './profile/user-page.component';

@NgModule({
  declarations: [
    UserPageComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class UserPageModule { }
