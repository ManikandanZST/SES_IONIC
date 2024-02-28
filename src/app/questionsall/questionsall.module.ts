import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuestionsAllPageRoutingModule } from './questionsall-routing.module';
import { QuestionsAllPage } from './questionsall.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsAllPageRoutingModule
  ],
  declarations: [QuestionsAllPage]
})
export class QuestionsAllPageModule {}
