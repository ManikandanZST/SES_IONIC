import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyprofilePageRoutingModule } from './myprofile-routing.module';

import { MyprofilePage } from './myprofile.page';
import { PopoverComponent } from '../popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyprofilePageRoutingModule
  ],
  declarations: [MyprofilePage,PopoverComponent],
  entryComponents: [PopoverComponent]
})
export class MyprofilePageModule {}
