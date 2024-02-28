import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentAckPageRoutingModule } from './studentack-routing.module';
import { StudentAckPage } from './studentack.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentAckPageRoutingModule
  ],
  declarations: [StudentAckPage]
})
export class StudentAckPageModule {}
