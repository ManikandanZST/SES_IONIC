import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnswersCheckPage } from './answerscheck.page';

const routes: Routes = [
  {
    path: '',
    component: AnswersCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswersCheckPageRoutingModule {}
