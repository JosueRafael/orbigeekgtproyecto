import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegistryPageComponent } from './auth/pages/registry-page/registry-page.component';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CartModule } from './cart/cart.module';
import { IndexPageComponent } from './index-page/index-page.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    MaterialModule,
    SharedModule,
    CartModule,
    RouterModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
