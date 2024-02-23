import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeInnerPage } from './home-inner.page';

const routes: Routes = [
  {
    path: '',
    component: HomeInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeInnerPageRoutingModule {}
