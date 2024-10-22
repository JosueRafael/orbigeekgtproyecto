import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistryPageComponent } from './pages/registry-page/registry-page.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutPageComponent,
    children: [{
      path: 'login', component: LoginPageComponent},
    {path: 'new-account', component: RegistryPageComponent},
  {path: '**', redirectTo: 'login'},
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
