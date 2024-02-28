import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamGuidencePage } from './examguidence.page';
const routes: Routes = [
  {
    path: '',
    component: ExamGuidencePage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamGuidencePageRoutingModule {}
