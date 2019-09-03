import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandRoutingModule } from './stand-routing.module';
import { GiveComponent } from './pages/give/give.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PortableModule } from 'src/app/portable/portable.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafePipeModule } from 'safe-pipe';


@NgModule({
  declarations: [GiveComponent, PurchaseComponent],
  imports: [
    CommonModule,
    StandRoutingModule,
    PortableModule,
    FlexLayoutModule,
    SafePipeModule
  ]
})
export class StandModule { }
