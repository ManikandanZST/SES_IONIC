import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgorPassProcPageRoutingModule } from './forgotpassproc-routing.module';

import { ForgorPassProcPage } from './forgotpassproc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgorPassProcPageRoutingModule
  ],
  declarations: [ForgorPassProcPage]
})
export class ForgorPassProcPageModule {}
