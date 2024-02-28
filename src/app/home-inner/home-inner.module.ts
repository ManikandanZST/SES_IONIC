import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeInnerPageRoutingModule } from './home-inner-routing.module';
import { HomeInnerPage } from './home-inner.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeInnerPageRoutingModule
  ],
  declarations: [HomeInnerPage]
})
export class HomeInnerPageModule {}
