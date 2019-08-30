import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AddComponent } from './pages/add/add.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'add', component: AddComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortableRoutingModule { }
