import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingReportPage } from './trainingreport.page';
const routes: Routes = [
  {
    path: '',
    component: TrainingReportPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingReportPageRoutingModule {}
