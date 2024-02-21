import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProctorLoginComponent } from './proctor-login/proctor-login.component';
import { PurchaseinfoProctorComponent } from './purchaseinfo-proctor/purchaseinfo-proctor.component';

import { TrainingCenterPage } from './training-center.page';
import { TrainingCenterComponent } from './training-center/training-center.component';
import { ValuePackComponent } from './value-pack/value-pack.component';


const routes: Routes = [
  {
    path: '',
    component: TrainingCenterPage
  },
  {
    path: 'training-center',
    component: TrainingCenterComponent
  },
  {
    path: 'value-pack',
    component: ValuePackComponent
  },
  {
    path: 'proctor',
    component: ProctorLoginComponent
  },
  {
    path: 'purchaseinfo-proctor',
    component: PurchaseinfoProctorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingCenterPageRoutingModule {}
