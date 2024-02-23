import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualUserComponent } from './individual-user/individual-user.component';
import { PurchaseEntirePackageComponent } from './purchase-entire-package/purchase-entire-package.component';
import { PurchaseinformationformComponent } from './purchaseinformationform/purchaseinformationform.component';

const routes: Routes = [
  {
    path: '',
    component: IndividualUserComponent
  },
  {
    path: 'PurchaseEP',
    component: PurchaseEntirePackageComponent
  },
  {
    path: 'PurchaseIF',
    component: PurchaseinformationformComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualUserRoutingModule { }
