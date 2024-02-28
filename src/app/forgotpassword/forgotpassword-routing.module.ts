import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgorPasswordPage } from './forgotpassword.page';
const routes: Routes = [
  {
    path: '',
    component: ForgorPasswordPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgorPasswordPageRoutingModule {}
