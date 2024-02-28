import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrainingCenterPageRoutingModule } from './training-center-routing.module';
import { TrainingCenterPage } from './training-center.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingCenterPageRoutingModule
  ],
  declarations: [TrainingCenterPage]
})
export class TrainingCenterPageModule {}
