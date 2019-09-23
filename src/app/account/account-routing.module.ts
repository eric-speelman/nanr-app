import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { LoginComponent } from './pages/login/login.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { IntegrateComponent } from './pages/integrate/integrate.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { AuthGuard } from 'src/app/core';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard]  },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'integrate', component: IntegrateComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'reset/:token', component: PasswordResetComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'confirm/:code',  component: ConfirmComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
