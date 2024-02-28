import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentFormPageRoutingModule } from './studentform-routing.module';
import { StudentFormPage } from './studentform.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentFormPageRoutingModule
  ],
  declarations: [StudentFormPage]
})
export class StudentFormPageModule {}
