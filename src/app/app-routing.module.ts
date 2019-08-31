import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'portable', loadChildren: () => import('./portable/portable.module').then(m => m.PortableModule)},
  {path: '', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  { path: 's', loadChildren: () => import('./stand/stand.module').then(m => m.StandModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
