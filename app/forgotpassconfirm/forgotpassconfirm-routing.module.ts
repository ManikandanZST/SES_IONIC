import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgorPassConfirmPage } from './forgotpassconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: ForgorPassConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgorPassConfirmPageRoutingModule {}
