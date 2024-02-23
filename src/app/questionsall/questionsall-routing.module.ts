import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsAllPage } from './questionsall.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionsAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsAllPageRoutingModule {}
