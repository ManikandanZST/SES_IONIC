import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgorPasswordPageRoutingModule } from './forgotpassword-routing.module';
import { ForgorPasswordPage } from './forgotpassword.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgorPasswordPageRoutingModule
  ],
  declarations: [ForgorPasswordPage]
})
export class ForgorPasswordPageModule {}
