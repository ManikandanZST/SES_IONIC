import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAckPage } from './studentack.page';
const routes: Routes = [
  {
    path: '',
    component: StudentAckPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentAckPageRoutingModule {}
