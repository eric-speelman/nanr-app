import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { LoginComponent } from './pages/login/login.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { IntegrateComponent } from './pages/integrate/integrate.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'purchase', component: PurchaseComponent},
  { path: 'login', component: LoginComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'transactions', component: TransactionsComponent},
  { path: 'integrate', component: IntegrateComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
