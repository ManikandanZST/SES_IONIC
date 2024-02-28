import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { PurchasecourseComponent } from './purchasecourse/purchasecourse.component';
import { GrouptrainingreportComponent } from './grouptrainingreport/grouptrainingreport.component';
import { DeactiveUserslistComponentComponent } from './deactive-userslist-component/deactive-userslist-component.component';
import { UserreportgroupComponent } from '../userreportgroup/userreportgroup.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage,PurchasecourseComponent,GrouptrainingreportComponent,DeactiveUserslistComponentComponent,UserreportgroupComponent]
})
export class HomePageModule {}
