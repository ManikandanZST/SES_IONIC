import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { PurchaseinformationformComponent } from 'src/app/individual-user/purchaseinformationform/purchaseinformationform.component';
import { SignUpDetailComponent } from 'src/app/sign-up-detail/sign-up-detail.component';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { PurchaseinfoProctorComponent } from '../purchaseinfo-proctor/purchaseinfo-proctor.component';
@Component({
  selector: 'app-proctor-login',
  templateUrl: './proctor-login.component.html',
  styleUrls: ['./proctor-login.component.scss'],
})
export class ProctorLoginComponent implements OnInit {
@Input ("SLVal") SLVal;
@Input ("Mtype") Mtype;
@Input ("ttP") ttP;
ulogin:any=[];
status: number;
userid: string;
userdata: any;
emailval: any;
id: any;
type: any;
  myActiveSlide: number;
  valInfo: any;
  titleCourse: any;
  coursePrice: any;
  sectionId: any;
  info: any;
  showPassword = false;
  inputtype: any;
  LoginProctID: any;
  coursesList: any;
constructor(public router:Router,public loginService:LoginService,public alertController: AlertController, private commonService: CommonService,private modalCtrl:ModalController,private activatedRoute: ActivatedRoute,) {
  this.activatedRoute.params.subscribe(params => {
    this.type=params['id'];
});
}
ngOnInit() {
  this.inputtype = "password";
}
SignIn(ulogin)
{
  if (ulogin.userId == "" || ulogin.userId == undefined) {
    this.commonService.presentToast("Enter userId");
  } else if(ulogin.password == "" || ulogin.password == undefined) {
    this.commonService.presentToast("Enter Password");
  }else{
    var id = localStorage.getItem("Userid");
    var mType=this.Mtype;
    var SLVal=this.SLVal;
    var ttP=this.ttP;
    var data = 'ProctorId='+ulogin.userId+'&Password='+ulogin.password +'&UserId='+id;
   this.commonService.presentLoading();
   this.loginService.Signin_proctor(data).then(
     (Response: any) => {
       if(Response.Status == 'Success')
       {
         this.commonService.closeLoading();
         this.commonService.presentToast('Login Sucessfully');
         localStorage.setItem("ProctID",ulogin.userId);
         localStorage.setItem("MVal",this.SLVal);
         if(ttP == 'training')
              {
                this.listTraining();
              }
              if(mType == 'normal')
              {
               this.overallRedirect(SLVal);
               this.listTraining();
               this.commonService.presentToast(Response.Message);
              }else if(mType == 'manual')
              {
               this.commonService.presentToast(Response.Message);
              }else if(mType == 'test')
              {
                this.commonService.presentToast(Response.Message);
              }else if(mType == 'video')
              {
               this.commonService.presentToast(Response.Message);
              }
              this.modalCtrl.dismiss();
       }else{
        localStorage.setItem("ProctID",'');
         this.commonService.closeLoading();
         this.commonService.presentToast(Response.Message);
       }
     },
     err => {
       this.commonService.closeLoading();
       this.commonService.presentToast(`Connection error`);
     }
   );
}
}
async listTraining(){
  if(localStorage.getItem("ProctID") == null || localStorage.getItem("ProctID") == undefined){
    this.LoginProctID = '';
    localStorage.setItem("ProctID",'');
  }else{
    if(localStorage.getItem("ProctID") == '')
    {
      this.LoginProctID = '';
    }else
    {
      this.LoginProctID = localStorage.getItem("ProctID");
    }
  }
  var uid = localStorage.getItem("Userid");
  if(localStorage.getItem("ProctID") == '' || localStorage.getItem("ProctID") == undefined || localStorage.getItem("ProctID") == null){
    var pid = '0';
  }
  else{
    var pid = localStorage.getItem("ProctID");
  }
  this.commonService.presentLoading();
  var lnk = 'GetMemModules/?UserId=' + uid + '&ProctorId=' + pid;
  this.loginService.getData(lnk).then((Response) => {
    this.commonService.closeLoading();
    if (Response) {
      this.coursesList = Response;
    }
    else {
      this.commonService.closeLoading();
      this.commonService.presentToast(`Connection error`);
    }
  }, err => {
    this.commonService.closeLoading();
    this.commonService.presentToast(`Connection error`);
  });
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
        subHeader: 'Alert Pages!',
        message: '<p>'+val.showAlert+'</p>',
        buttons: [
          {
            text: "Okay",
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
      subHeader: 'Alert Pages!',
      message: '<p>This course is suspended to your account.</br> Please contact Shawneerct Admin.</p>',
      buttons: [
        {
          text: "Okay",
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
    var tT = this.countdownTime( val.timelimit, 0 );
    //var tT=0;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Total Time Duration of Exam Overall!',
      subHeader: '',
      message: ''+tT+'',
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
            this.router.navigate([`/questionsall/${val.testId}/${val.OverId}/${val.timelimit}`]);
          }
        }
      ],
    });
    await alert.present();
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
async openPage7(val)
{
  this.myActiveSlide = 0;
  var id = localStorage.getItem("Userid");
  var userType =localStorage.getItem("type");
  if(userType == 'group')
    {
        var lnk =  'GetGroupUser?GroupId='+id;
    }else
    {
        var lnk =  'GetUser/'+id;
    }
    this.loginService.getData(lnk).then(
   async   (Response: any) => {
        this.valInfo = val;
        this.type = 'overall';
        this.titleCourse = val.Module_Name;
        this.coursePrice = val.Price;
        this.sectionId = val.sid;
        this.info=Response;
       this.modalCtrl.dismiss();
      setTimeout(async () => {
        const modal = await this.modalCtrl.create({
          component: PurchaseinfoProctorComponent,
          componentProps: {
            "titleCourse": this.titleCourse,
            "coursePrice": this.coursePrice,
          },
          cssClass: 'my-custom-modal-css',
          swipeToClose: true,
        })
        return await modal.present();
      }, 100);
      },
      err => {
      }
    );
}
async modal_popup(){
  this.router.navigate([`signup/proctorregister`]).then(() => {
    this.modalCtrl.dismiss();
  });
}
back(){
  this.modalCtrl.dismiss();
}
toggleShow() {
  this.showPassword = !this.showPassword;
  this.inputtype = this.showPassword ? 'text' : 'password';
}
  forgotpass(){
    this.router.navigate([`/forgotpassproc`]);
    this.modalCtrl.dismiss();
  }
}
