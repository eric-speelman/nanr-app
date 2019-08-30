import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { AccountRoutingModule } from './account-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { PortableModule } from '../portable/portable.module';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { LoginComponent } from './pages/login/login.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { IntegrateComponent } from './pages/integrate/integrate.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [SignupComponent, PurchaseComponent, LoginComponent, WithdrawComponent, TransactionsComponent, IntegrateComponent, HomeComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    PortableModule
  ]
})
export class AccountModule { }
