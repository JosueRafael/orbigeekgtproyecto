import { MainPageComponent } from './cart/pages/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { CheckoutPageComponent } from './cart/components/checkout/checkout.component';
import { IndexPageComponent } from './index-page/index-page.component';


const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  },
  {
    path: 'auth',
    loadChildren:() => import('./auth/auth.module').then( n => n.AuthModule),
  },

  {
    path: 'cart',
    component:MainPageComponent,
  },
  {
   path: 'checkout', component: CheckoutPageComponent,
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
