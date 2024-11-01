
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './cart/components/checkout/checkout.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { UserPageComponent } from './user-page/profile/user-page.component';
import { AuthGuard } from './auth/service/auth.guard';
import { AdminProductosComponent } from './admin-productos/pages/admin-productos.component';
import { CatalogoComponent } from './catalogo/vista/catalogo.component';
import { AdminPageComponent } from './admin-page/mainpage/admin-page.component';
import { RegistrotecnicoComponent } from './registrotecnico/paginar/registrotecnico.component';
import { MisordenesComponent } from './misordenes/view/misordenes.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(n => n.AuthModule),
  },
  {
    path: 'misordenes',
    component: MisordenesComponent,
  },
  {
    path: 'adminpage',
    component: AdminPageComponent,
  },
  {
    path: 'registrotecnico',
    component: RegistrotecnicoComponent,
  },
  {
    path: 'profile',
    component: UserPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
  },
{
  path: 'adminproductos',
  component: AdminProductosComponent,
},
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
