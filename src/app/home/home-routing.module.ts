import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupuseraddComponent } from '../groupuseradd/groupuseradd.component';
import { OverallexamComponent } from '../overallexam/overallexam.component';
import { AddexistuserComponent } from './addexistuser/addexistuser.component';
import { AddnewuserComponent } from './addnewuser/addnewuser.component';
import { DeactiveUserslistComponentComponent } from './deactive-userslist-component/deactive-userslist-component.component';
import { GrouptrainingreportComponent } from './grouptrainingreport/grouptrainingreport.component';
import { HomePage } from './home.page';
import { OverallvalueComponent } from './overallvalue/overallvalue.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { PurchasecourseComponent } from './purchasecourse/purchasecourse.component';
import { PurchaseexamComponent } from './purchaseexam/purchaseexam.component';
import { PurchasevaluepackComponent } from './purchasevaluepack/purchasevaluepack.component';
import { UserslistComponent } from './userslist/userslist.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'purchasecourse',
    component: PurchasecourseComponent
  },
  {
    path: 'payment',
    component: PaymentModalComponent
  },
  {
    path: 'purchaseexam',
    component: PurchaseexamComponent
  },
  {
    path: 'purchasevaluepack',
    component: PurchasevaluepackComponent
  },
  {
    path: 'purchaseoverall',
    component: OverallvalueComponent
  },
  {
    path: 'employeelist',
    component: UserslistComponent
  },
  {
    path: 'deactiveemployeelist',
    component: DeactiveUserslistComponentComponent
  },
  {
    path: 'newuser',
    component: AddnewuserComponent
  },
  {
    path: 'existuser',
    component: AddexistuserComponent
  },
  {
    path: 'trainingreport',
    component: GrouptrainingreportComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)      ],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
