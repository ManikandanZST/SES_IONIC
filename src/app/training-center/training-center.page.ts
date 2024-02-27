import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/providers/login.service';
import { AlertController, ModalController } from '@ionic/angular';
import { protractor } from 'protractor';
import { ProctorLoginComponent } from './proctor-login/proctor-login.component';
import { PurchaseinfoProctorComponent } from './purchaseinfo-proctor/purchaseinfo-proctor.component';

@Component({
  selector: 'app-training-center',
  templateUrl: './training-center.page.html',
  styleUrls: ['./training-center.page.scss'],
})
export class TrainingCenterPage implements OnInit {
  coursesList: any=[];
  type: string;
  Outstanding:boolean=false;
  LoginProctID: string;
  myActiveSlide: number;
  valInfo: any;
  titleCourse: any;
  coursePrice: any;
  sectionId: any;
  info: any;
  SLVal: any;
  Mtype: any;
  constructor(public loginService:LoginService,public router:Router,public alertController: AlertController,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getmemmodule();
    this.type=localStorage.getItem('type')
    this.LoginProctID=localStorage.getItem('ProctID')
    
  }
getmemmodule(){
  var uid=localStorage.getItem('Userid');
  if(localStorage.getItem('Proctid ') == '' || localStorage.getItem('Proctid ')== undefined || localStorage.getItem('Proctid ') == null)
  {
    var pid = '0';

  }else{
    var pid = localStorage.getItem('Proctid');

  }
  var lnk='GetMemModules/?UserId='+uid+'&ProctorId='+pid;
  this.loginService.getData(lnk).then(
    (Response: any) => {

      if(Response)
      {
      this.coursesList=Response;
      

      }else{

      }
    },
    err => {

    }
  );
}
showPurchasedCourse(){
this.Outstanding=true
}

click_label(SL){
  
  localStorage.setItem("pgtrain", '1');
if(SL.Proctor_Login == false && SL.Isgroup){

  this.trainingcourse(SL.sid)
}else if(SL.Proctor_Login == false && SL.Isgroup == '0' && SL.ModuleId != '-3'){

this.coursePage(SL.ModuleId,'','');
}else if(SL.Proctor_Login == false && SL.Isgroup == '0' && SL.ModuleId == '-3'){

this.valuepack();
}else if(this.LoginProctID != '' && SL.Proctor_Login == true){

this.overallRedirect(SL)
}else if(this.LoginProctID == '' && SL.Proctor_Login == true){
  

this.showModalPLogin(SL,'normal')

}
}
trainingcourse(id){
  
  this.router.navigate([`/home-inner/${id}`])
}

coursePage(module_id,sid,sh_course){
  
  this.router.navigate([`/home-details/${module_id}`]);
  // this.router.navigate([`/home-details/${module_id}`],{queryParams: {back: this.CourseId}});

}
valuepack(){
  this.router.navigate([`trainingcenter/training-center`])
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

              // $state.go("sidemenu.trainingcenter",{type:'individual',page:'none'});
              // this.router.navigate([`/home/${this.type}/'purchasecourse'`])



            }
          }
        ]
      });
      await alert.present();
          // var alertPopup = $ionicPopup.alert({
          //        title: 'Alert Pages!',
          //        template: '<p>'+val.showAlert+'</p>'
          //  });
          //  alertPopup.then(function(res) {
          //     $state.go("sidemenu.trainingcenter",{type:'individual',page:'none'});
          //  });

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

            // $state.go("sidemenu.trainingcenter",{type:'individual',page:'none'});
            // this.router.navigate([`/home/${this.type}/'purchasecourse'`])



          }
        }
      ]
    });
    await alert.present();
      // var alertPopup = $ionicPopup.alert({
      //        title: 'Alert Message!',
      //        template: '<p>This course is suspended to your account.</br> Please contact Shawneerct Admin.</p>'
      //  });
      //  alertPopup.then(function(res) {
      //  });
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
            //close the modal
            this.modalCtrl.dismiss();
          }
        },
        {
          text: "Continue",
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.router.navigate([`/questionsall/${val.testId}/${val.OverId}/${val.timelimit}`]);
            // $state.go("questionsAll",{OverId:val.OverId,testID:val.testId,timer:val.timelimit});
            // this.router.navigate([`/home/${this.type}/'purchasecourse'`])
          }
        }
      ],

    });
    await alert.present();

      // var alertPopup = $ionicPopup.show({
      //        title: "<div class=''><b>Total Time Duration of Exam Overall!</b></div>",
      //        template: "<div>"+tT+"</div>",
      //         buttons: [
      //          { text: 'Not Now',
      //             type:'button-dark',
      //             onTap: function(e) {
      //            }
      //           },
      //          {
      //            text: '<b>Continue</b>',
      //            type: 'button-royal',
      //            onTap: function(e) {
      //               $state.go("questionsAll",{OverId:val.OverId,testID:val.testId,timer:val.timelimit});
      //            }
      //          },
      //        ]
      //  });


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


openPage7(val)
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
     async (Response: any) => {
        this.valInfo = val;
        this.type = 'overall';
        this.titleCourse = val.Module_Name;
        this.coursePrice = val.Price;
        this.sectionId = val.sid;
        this.info=Response;

        const modal = await this.modalCtrl.create({
          component: PurchaseinfoProctorComponent,
          componentProps: {
            "titleCourse": this.titleCourse,
            "coursePrice": this.coursePrice,
            "OverId": this.valInfo.OverId
          },
          cssClass: 'my-custom-modal-css',
          swipeToClose: true,
          // breakpoints: [0, 0.25, 0.5, 0.75],
              // initialBreakpoint: 0.3,

        })
        return await modal.present();
      },
      err => {

      }
    );
  // webservice.userInfo(id,lnk).then(function(response) {
  
  //       $ionicLoading.hide();
  //       $scope.valInfo = val;
  //       $scope.type = 'overall';
  //       $scope.titleCourse = val.Module_Name;
  //       $scope.coursePrice = val.Price;
  //       $scope.sectionId = val.sid;
  //       $scope.infoU = response.data;
  //       $scope.modalPage7.show();
  // })
}
async showModalPLogin(SL,mtype)
{
  
  

    if(SL.UserStatus == '2' || SL.UserStatus == '1')
    {

      this.SLVal = SL;
      this.Mtype = mtype;
      const modal = await this.modalCtrl.create({
        component: ProctorLoginComponent,
        componentProps: {
          "SLVal": this.SLVal,
          "Mtype":this.Mtype,
          "ttP":'training'
        },
        cssClass: 'my-custom-modal-css',
        swipeToClose: true,
        // breakpoints: [0, 0.25, 0.5, 0.75],
            // initialBreakpoint: 0.3,

      })
      return await modal.present();
      // $scope.modalPage6.show();
      // proctor login

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

              // $state.go("sidemenu.trainingcenter",{type:'individual',page:'none'});
              // this.router.navigate([`/home/${this.type}/'purchasecourse'`])



            }
          }
        ]
      });
      await alert.present();
        // var alertPopup = $ionicPopup.alert({
        //        title: 'Alert Message!',
        //        template: '<p>This course is suspended to your account.</br> Please contact Shawneerct Admin.</p>'
        //  });
        //  alertPopup.then(function(res) {
        //  });
    }

}
back(){
  // this.Outstanding=false;
  if(this.Outstanding==false){
  this.router.navigate([`home/individual`]).then(()=>{
    //window.location.reload()
  })
}else{
  this.Outstanding=false
}
}
}
