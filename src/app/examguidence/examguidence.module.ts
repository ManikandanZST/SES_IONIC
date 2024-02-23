import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamGuidencePageRoutingModule } from './examguidence-routing.module';

import { ExamGuidencePage } from './examguidence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamGuidencePageRoutingModule
  ],
  declarations: [ExamGuidencePage]
})
export class ExamGuidencePageModule {}
