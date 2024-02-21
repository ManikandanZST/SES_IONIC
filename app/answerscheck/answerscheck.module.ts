import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswersCheckPageRoutingModule } from './answerscheck-routing.module';

import { AnswersCheckPage } from './answerscheck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswersCheckPageRoutingModule
  ],
  declarations: [AnswersCheckPage]
})
export class AnswersCheckPageModule {}
