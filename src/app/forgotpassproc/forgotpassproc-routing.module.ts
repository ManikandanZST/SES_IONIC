import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgorPassProcPage } from './forgotpassproc.page';
const routes: Routes = [
  {
    path: '',
    component: ForgorPassProcPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgorPassProcPageRoutingModule {}
