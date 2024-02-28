import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrainingReportPageRoutingModule } from './trainingreport-routing.module';
import { TrainingReportPage } from './trainingreport.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingReportPageRoutingModule
  ],
  declarations: [TrainingReportPage]
})
export class TrainingReportPageModule {}
