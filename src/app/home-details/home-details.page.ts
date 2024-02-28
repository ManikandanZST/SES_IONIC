import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/providers/login.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PurchaseEntirePackageComponent } from '../individual-user/purchase-entire-package/purchase-entire-package.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PurchaseinformationformComponent } from '../individual-user/purchaseinformationform/purchaseinformationform.component';
import { CommonService } from 'src/providers/common.service';
@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.page.html',
  styleUrls: ['./home-details.page.scss'],
})
export class HomeDetailsPage implements OnInit {
  search: boolean=false;
  filterData: any;
  searchTerm: any;
  moduleid: any;
  modulelist: any={};
  myActiveSlide: number;
  back_id: any;
  SLVal: any;
  Mtype: any;
  tAmt: number;
  valueS: any;
  infoU: any;
  sectionlist: any;
  valInfo: any;
  type: any;
  titleCourse: any;
  coursePrice: any;
  sectionId: any;
  constructor(private activatedRoute: ActivatedRoute,private commonService: CommonService,public loginService:LoginService,private modalCtrl:ModalController,public router:Router,public alertController: AlertController,private iab: InAppBrowser) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.back_id=params['back'];
   });
   this.moduleid= this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.getcourse_detail();
  }
getcourse_detail(){
  this.commonService.presentLoading();
  var uid=localStorage.getItem('Userid');
  var nodeid= this.moduleid;
    var lnk =  'GetModulesList/?nodeid='+nodeid+'&userId='+uid;
    this.loginService.getData(lnk).then(
    (Response: any) => {
      this.commonService.closeLoading();
      if(Response)
      {
        this.modulelist=Response;
      }else{
        this.commonService.closeLoading();
      }
    },
    err => {
    }
  );
}
  async manualRedirect(val){
  if(val.sectionName == '2.10 Demonstration & Rad Worker Study Guide' || val.sectionName == '1.08 Demonstration & Rad Worker Study Guide'){ //rad worker Demonstration & Rad Worker Study Guide is free for all users
    this.getlink('https://shawneerct.com/manuals/'+val.manFile);
  }else{
    if(val.showAlert == '0'){
      this.commonManual(val);
    }
    else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        subHeader: 'Alert Message!',
        message:  '<p>'+val.showAlert+'</p>',
        buttons: [
          {
            text: "Okay",
            cssClass: 'alert-button-confirm',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
    }
  }
}
commonManual(val)
  {
    if(val.testingPaid == "0")
    {
        this.openPage3(val,'manual')
    }else
    {
        this.getlink('https://shawneerct.com/manuals/'+val.manFile);
    }
  }
 async openPage3(val,type)
  {
    var sectionlist=val;
   this.myActiveSlide = 0;
    var id =localStorage.getItem('Userid');
    var userType = localStorage.getItem('type');
      if(userType == 'group')
        {
            var lnk =  'GetGroupUser?GroupId='+id;
        }else
        {
            var lnk =  'GetUser/'+id;
        }
        this.loginService.getData(lnk).then(
          async (Response: any) => {
            if(Response)
            {
              this.valInfo = val;
              this.type = type;
              this.titleCourse = val.sectionName;
              this.coursePrice = val.price;
              this.sectionId = val.sectionId;
              this.infoU = Response;
              const modal = await this.modalCtrl.create({
                component: PurchaseinformationformComponent,
                componentProps: {
                  "sectionlist": sectionlist,
                  "info": this.infoU,
                  "sectionId":this.sectionId,
                },
                cssClass: 'my-custom-modal-css',
                swipeToClose: true,
              })
              return await modal.present();
            }else{
            }
          },
          err => {
          }
        );
  }
  getlink(link)
	{
		var options = {
		location: 'yes',
		clearcache: 'yes',
		toolbar: 'no'
		};
		this.iab.create(link, '_system')
	}
  back(){
    if(this.back_id == undefined){
      this.router.navigate([`/trainingcenter/`]);
    }
    else{
      this.router.navigate([`home-inner/${this.back_id}`]);
    }
  }
 async checkTest (sVal,mtype)
  {
    if(sVal.UserStatus == '2' || sVal.UserStatus == '1')
    {
      if(localStorage.loginProctid == null || localStorage.loginProctid == undefined)
      {
        this.showModalPLogin(sVal,mtype);
      }else
      {
        if(localStorage.loginProctid == '')
        {
          this.showModalPLogin(sVal,mtype);
        }else
        {
          if(sVal.IsPay)
          {
          }else{
            this.overallRedirect(sVal)
          }
        }
      }
    }else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        subHeader: 'Alert Message!',
        message: '<p>This course is suspended to your account.</br> Please contact Shawneerct Admin.</p>',
        buttons: [
          {
            text: "Okay",
            cssClass: 'alert-button-confirm',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
      }
  }
async showModalPLogin(SL,mtype)
  {
      if(SL.UserStatus == '2' || SL.UserStatus == '1')
      {
       this.SLVal = SL;
        this.Mtype = mtype;
      }else{
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: '',
          subHeader: 'Alert Message!',
          message: '<p>This course is suspended to your account.</br> Please contact Shawneerct Admin.</p>',
        });
        await alert.present();
      }
  }
  async overallRedirect(val)
  {
    if(val.UserStatus == '2' || val.UserStatus == '1')
    {
       if(val.showAlert == '0' || val.showAlert == null || val.showAlert == '')
       {
            this.commonOverallTest(val)
       }else
       {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: '',
          subHeader: 'Alert Message!',
          message: '<p>'+val.showAlert+'</p>',
          buttons: [
            {
              text: "Okay",
              cssClass: 'alert-button-confirm',
              handler: () => {
              }
            }
          ]
        });
        await alert.present();
       }
    }else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        subHeader: 'Alert Message!',
        message: '<p>This course is suspended to your account.</br> Please contact Shawneerct Admin.</p>',
        buttons: [
          {
            text: "Okay",
            cssClass: 'alert-button-confirm',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
    }
  }
async commonOverallTest(val)
  {
    if(!val.IsPay)
    {
        this.openPage7(val);
    }else
    {
    }
  }
 openPage7(val)
  {
    this.myActiveSlide = 0;
    var id =localStorage.getItem('Userid');
    var userType = localStorage.getItem('type');
    if(userType == 'group')
      {
          var lnk =  'GetGroupUser?GroupId='+id;
      }else
      {
          var lnk =  'GetUser/'+id;
      }
      this.loginService.getData(lnk).then(
        (Response: any) => {
          if(Response)
          {
            this.modulelist=Response;
          }else{
          }
        },
        err => {
        }
      );
  }
 async videoRedirect(val)
  {
    if(val.sectionName == '2.10 Demonstration & Rad Worker Study Guide' || val.sectionName == '1.08 Demonstration & Rad Worker Study Guide'){ //rad worker Demonstration & Rad Worker Study Guide is free for all users
      this.getlink(val.videoFile);
    }else{
     if(val.showAlert == '0')
     {
       this.commonVideo(val)
     }else
     {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        subHeader: 'Alert Message!',
        message:  '<p>'+val.showAlert+'</p>',
        buttons: [
          {
            text: "Okay",
            cssClass: 'alert-button-confirm',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
     }
    }
  }
commonVideo(val)
  {
    if(val.testingPaid == "0")
    {
        this.openPage3(val,'video')
    }else
    {
        this.getlink(val.videoFile);
    }
  }
  openPage4(val)
  {
    this.myActiveSlide = 0;
    var id = localStorage.getItem("Userid");
  this.tAmt=0;
    var userType = localStorage.getItem("type");
    if(userType == 'group')
      {
          var lnk =  'GetGroupUser?GroupId='+id;
      }else
      {
          var lnk =  'GetUser/'+id;
      }
      this.loginService.getData(lnk).then(
        (Response: any) => {
          if(Response)
          {
            this.valueS = val;
                  this.Mtype = '';
                  this.infoU = Response.data;
                  for(var a =0;a<val.length;a++)
                  {
                    if(val[a].testingPaid == '0' || val[a].testingPaid =='' || val[a].testingPaid == null)
                    {
                      this.tAmt = val[a].price + this.tAmt;
                    }
                  }
                  var amt=this.tAmt
                  var nid=this.moduleid;
                   this.purchasepackage(amt,nid);
          }else{
          }
        },
        err => {
        }
      );
  }
 async  purchasepackage(amt:any,nid:any){
    const modal = await this.modalCtrl.create({
      component: PurchaseEntirePackageComponent,
      componentProps: {
        "sectionlist": this.modulelist.sectionlist,
        "amt": amt,
        "nid":nid,
      },
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
    })
    return await modal.present();
  }
async testRedirect(val)
  {
     if(val.showAlert == '0')
     {
          this.commonTest(val)
     }else
     {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        subHeader: 'Alert Message!',
        message:  '<p>'+val.showAlert+'</p>',
        buttons: [
          {
            text: "Okay",
            cssClass: 'alert-button-confirm',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
     }
     }
     async commonTest (val)
     {
       if(val.testingPaid != "0")
       {
          var tT = this.countdownTime( val.timelimit ,0 );
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Total Time Duration of Exam Overall!',
          subHeader: "",
          message:  ''+tT+'',
          buttons: [
            {
              text: "Not Now",
              cssClass: 'alert-button-cancel',
              handler: () => {
                this.modalCtrl.dismiss();
              }
            },
            {
              text: "Continue",
              cssClass: 'alert-button-confirm',
              handler: () => {
                this.router.navigate([`/questions/${val.sectionId}/${val.testID}/${val.sectionName}/${val.timelimit}/${this.moduleid}/${this.back_id}`]);
              }
            }
          ]
        });
        await alert.present();
       }else
       {
             this.openPage3(val,'test')
       }
     }
    countdownTime( minutes, seconds )
    {
      var element, endTime, hours, mins, msLeft, time;
      endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
      function twoDigits1( n )
      {
        return (n <= 9 ? "0" + n : n);
      }
      msLeft = endTime - (+new Date);
      time = new Date( msLeft );
      hours = time.getUTCHours();
      mins = time.getUTCMinutes();
      return (hours ? hours + ' Hour ' + twoDigits1( mins ) : mins) + ' Mins ' + twoDigits1( time.getUTCSeconds() + ' Secs ' );
    }
     setFilteredLocations(){
      this.search=true;
      this.filterData = this.modulelist.sectionlist.filter((location) => {
        return location.sectionName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }
    onCancel($event){
      this.search=false;
      this.filterData=this.sectionlist
      $event.target.value = '';
    }
}
