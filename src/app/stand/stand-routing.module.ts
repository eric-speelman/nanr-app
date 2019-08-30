import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiveComponent } from './pages/give/give.component';
import { PurchaseComponent } from './pages/purchase/purchase.component'


const routes: Routes = [
  {path: 'app/purchase', component: PurchaseComponent },
  { path: ':username', component: GiveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandRoutingModule { }
