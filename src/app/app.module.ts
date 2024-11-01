import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IndexPageComponent } from './index-page/index-page.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment'; // Importa environment
import { FormsModule } from '@angular/forms';
import { UserPageModule } from './user-page/user-page.module';
import { AdminProductosModule } from './admin-productos/admin-productos.module';
import { FirestoreModule } from '@angular/fire/firestore';
import { CatalogoModule } from './catalogo/catalogo.module';
import { AdminPageModule } from './admin-page/admin-page.module';
import { RegistrotecnicoModule } from './registrotecnico/registrotecnico.module';
import { MisordenesModule } from './misordenes/misordenes.module';

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
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirestoreModule,
    FormsModule,
    UserPageModule,
    AdminProductosModule,
    CatalogoModule,
    CheckoutModule,
    AdminPageModule,
    RegistrotecnicoModule,
    MisordenesModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
