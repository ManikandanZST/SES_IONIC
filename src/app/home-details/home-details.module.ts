import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDetailsPageRoutingModule } from './home-details-routing.module';

import { HomeDetailsPage } from './home-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDetailsPageRoutingModule,
  ],
  declarations: [HomeDetailsPage]
})
export class HomeDetailsPageModule {}
