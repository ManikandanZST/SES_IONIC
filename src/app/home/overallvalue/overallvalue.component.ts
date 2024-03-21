import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SectionoverallvalueComponent } from 'src/app/sectionoverallvalue/sectionoverallvalue.component';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
@Component({
  selector: 'app-overallvalue',
  templateUrl: './overallvalue.component.html',
  styleUrls: ['./overallvalue.component.scss'],
})
export class OverallvalueComponent implements OnInit {
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
    console.log("ngoninit")
    this.GroupId=localStorage.getItem("loginuserid")
    this.GetGroupUser();
    this.GetGroupUserModules()
  }
  // ionViewWillEnter(){

  // }

  GetGroupUser(){
      var lnk =  'GetGroupUser?GroupId='+this.GroupId;
    this.loginService.getData(lnk).then(
      (Response: any) => {
        if(Response)
        {
                // this.info=Response.UserList;
        // this.info = Response.UserList.filter((u:any) => u.locked == 0);

        }else{
        }
      },
      err => {
      }
    );
  }
  GetGroupUserModules(){
    var lnk =  'GroupOverallValuePackage?GroupId='+this.GroupId;
    this.loginService.getData(lnk).then(
    (Response: any) => {
      if(Response)
      {
         // filer active user
        //  Response = Response.filter((u:any) => u.User.locked == 0);
      this.groupuser_NAMEs=Response;
      this.groupusers=Response[0].OverValuePackList      ;
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
  for(var i=0;i<lst.OverValuePackList.length;i++)
  {
      for(var k=0;k<listMulti.length;k++)
      {
          if(listMulti[k].Valuepack_id == lst.OverValuePackList[i].Valuepack_id)
          {
              tCheck = true;
              break;
          }else
          {
              tCheck = false;
          }
      }
      var lists = {
        Valuepack_id     : lst.OverValuePackList[i].Valuepack_id,
        Valuepack_Name   : lst.OverValuePackList[i].Valuepack_Name,
        Prize   : lst.OverValuePackList[i].Prize,
        checked   : tCheck,
      }
      templas.push(lists);
  }
  setTimeout(function(){
    this.multipleLists = templas;
  },600)
    const modal = await this.modalCtrl.create({
      component: SectionoverallvalueComponent,
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
      T=T+parseInt(location.Prize);
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
    modal.onDidDismiss().then((result:any) => {
      if (result && result.data && result.data.dismissed) {
      }
    });
    return await modal.present();
  }
  back(){
    this.router.navigate([`home/${this.type}`]).then(() => {
    });
  }
}
