import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgorPassConfirmPageRoutingModule } from './forgotpassconfirm-routing.module';
import { ForgorPassConfirmPage } from './forgotpassconfirm.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgorPassConfirmPageRoutingModule
  ],
  declarations: [ForgorPassConfirmPage]
})
export class ForgorPassConfirmPageModule {}
