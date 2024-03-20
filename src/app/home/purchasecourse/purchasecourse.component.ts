import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { $ } from 'protractor';
import { ModalpopupComponent } from 'src/app/modalpopup/modalpopup.component';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
@Component({
  selector: 'app-purchasecourse',
  templateUrl: './purchasecourse.component.html',
  styleUrls: ['./purchasecourse.component.scss'],
})
export class PurchasecourseComponent implements OnInit {
  selectcourse:any={};
  GroupId: string;
  info: any;
  groupusers: any;
  totalAmount: any;
  totalAmounts:any={};
  totalAmountChoosen: number;
  MULTIlist: any[];
  groupuser_NAMEs: any[];
  indexValue: any;
  multipleLists: any[];
  total: string;
  type: any;
  mul: boolean=false;
  filterData: any;
  searchTerm: any;
  userindex: any;
  isSearch: boolean;
  search: boolean=false;
  constructor(private loginService: LoginService,public router:Router,private activatedRoute: ActivatedRoute,private modalCtrl:ModalController,public common:CommonService) {
    this.activatedRoute.params.subscribe(params => {
      this.type=params['type'];
    });
  }
  ngOnInit() {

  }
  ionViewWillEnter(){
    this.GroupId=localStorage.getItem("loginuserid")
    this.GetGroupUser();
    this.GetGroupUserModules()
  }
  GetGroupUser(){
    var lnk =  'GetGroupUser?GroupId='+this.GroupId;
    this.loginService.getData(lnk).then(
      (Response: any) => {
        if(Response)
        {
        // this.info=Response.UserList;
  // filer active user
  this.info = Response.UserList.filter((u:any) => u.locked == 0);

        }else{
        }
      },
      err => {
      }
    );
  }
  GetGroupUserModules(){
   var lnk =  'GetGroupUserModules?GroupId='+this.GroupId;
   this.loginService.getData(lnk).then(
      (Response: any) => {


        if(Response)
        {     // filer active user
          Response = Response.filter((u:any) => u.User.locked == 0);

          this.groupuser_NAMEs=Response;

          let filderval = Response.filter((u:any) => u.User.locked == 0);

          this.groupusers=Response[0].ModuleList;
          var templs   = [];
          this.totalAmount=[];
          this.MULTIlist=[];
          for(var j=0;j<Response.length;j++)
          {
            this.totalAmount[j] = 0;
            this.totalAmountChoosen = 0;
            this.MULTIlist[j] = '';
            var dynNames = 'USER'+Response[j].User.userId;
            var totalAmount = 'total'+Response[j].User.userId;
            localStorage[dynNames] = JSON.stringify(templs);
            localStorage.setItem(totalAmount,'0');
            localStorage.setItem("totalAmountChoosen",'0');
          }
        }else{
        }
      },
      err => {
      }
    );
  }
  setFilteredLocations(){
    this.search=true;
    this.filterData = this.groupuser_NAMEs.filter((location) => {
      return location.User.fullName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }
  onCancel($event){
    this.search=false;
    this.filterData=this.groupuser_NAMEs
    $event.target.value = '';
  }
  async showCourse(lst, index){
    localStorage.setItem("selecteduser",index)
    this.indexValue = index;
    var dync = 'USER'+lst.User.userId;
    var listMulti = JSON.parse(localStorage.getItem(dync));
    this.multipleLists = [];
    var templas   = [];
    var tCheck = false;
    for(var i=0;i<lst.ModuleList.length;i++)
    {
      for(var k=0;k<listMulti.length;k++)
      {
        if(listMulti[k].ModuleType == lst.ModuleList[i].ModuleType)
        {
          tCheck = true;
          break;
        }else
        {
          tCheck = false;
        }
      }
      var lists = {
        ModuleType     : lst.ModuleList[i].ModuleType,
        ModuleName   : lst.ModuleList[i].ModuleName,
        ModulePrice   : lst.ModuleList[i].ModulePrice,
        checked   : tCheck,
      }
      templas.push(lists);
    }
    setTimeout(function(){
      this.multipleLists = templas;
    },600)
    const modal = await this.modalCtrl.create({
      component: ModalpopupComponent,
      componentProps: {
        "id": index,
        "selectcourse" : this.selectcourse[index] ? this.selectcourse[index]: '',
      },
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
    });
    modal.onDidDismiss().then((result) => {
      this.total=result.data.data3;
      this.selectcourse[result.data.data2]=result.data.data;
      // this.totalAmounts[result.data.data2]=result.data.data4;
      let T =0;
      let arr = result.data.data
      arr.map((location) => {
        T=T+parseInt(location.ModulePrice
          );
      });

      this.totalAmounts[result.data.data2]=T;
    })
    return await modal.present();
  }
  async showPayment(){
    const modal = await this.modalCtrl.create({
      component: PaymentModalComponent,
      componentProps: {
      },
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
    });
    modal.onDidDismiss().then((result) => {
    })
    return await modal.present();
  }
  back(){
    this.router.navigate([`home/${this.type}`]).then(() => {
    });
  }
}
