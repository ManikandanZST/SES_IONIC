import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonService } from '.././providers/common.service';
import { LoginService } from '.././providers/login.service';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import { PaymentModalComponent } from './home/payment-modal/payment-modal.component';
import { PurchaseexamComponent } from './home/purchaseexam/purchaseexam.component';
import { OverallexamComponent } from './overallexam/overallexam.component';
import { PurchasevaluepackComponent } from './home/purchasevaluepack/purchasevaluepack.component';
import { ValuepackComponent } from './valuepack/valuepack.component';
import { OverallvalueComponent } from './home/overallvalue/overallvalue.component';
import { SectionoverallvalueComponent } from './sectionoverallvalue/sectionoverallvalue.component';
import { UserslistComponent } from './home/userslist/userslist.component';
import { EditgroupuserComponent } from './editgroupuser/editgroupuser.component';
import { GroupuseraddComponent } from './groupuseradd/groupuseradd.component';
import { AddexistuserComponent } from './home/addexistuser/addexistuser.component';
import { AddnewuserComponent } from './home/addnewuser/addnewuser.component';
import { CommonModule } from '@angular/common';
import { PurchaseEntirePackageComponent } from './individual-user/purchase-entire-package/purchase-entire-package.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PurchaseinformationformComponent } from './individual-user/purchaseinformationform/purchaseinformationform.component';
import { TrainingCenterComponent } from './training-center/training-center/training-center.component';
import { ValuePackComponent } from './training-center/value-pack/value-pack.component';
import { ProctorLoginComponent } from './training-center/proctor-login/proctor-login.component';
import { PurchaseinfoProctorComponent } from './training-center/purchaseinfo-proctor/purchaseinfo-proctor.component';
import { EmployeereportComponent } from './employeereport/employeereport.component';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { SignUpDetailComponent } from './sign-up-detail/sign-up-detail.component';
import { Network } from '@ionic-native/network/ngx';
import { NetworkComponent } from './network/network.component';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
@NgModule({
  declarations: [AppComponent,NetworkComponent,ModalpopupComponent,PaymentModalComponent,PurchaseexamComponent,
    OverallexamComponent,PurchasevaluepackComponent,ValuepackComponent,OverallvalueComponent,
    SectionoverallvalueComponent,UserslistComponent,EditgroupuserComponent,GroupuseraddComponent,PurchaseEntirePackageComponent,
    GroupuseraddComponent,AddexistuserComponent,AddnewuserComponent,PurchaseinformationformComponent,TrainingCenterComponent,ValuePackComponent,ProctorLoginComponent,PurchaseinfoProctorComponent,EmployeereportComponent,LoginDetailsComponent,SignUpDetailComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
    HttpClientModule,FormsModule,CommonModule],
  providers: [
    CommonService,
    LoginService,
    InAppBrowser,SocialSharing,
    Network,OpenNativeSettings,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
