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
      console.log(params,"params");
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
        console.log(this.modulelist.sectionlist,"modulelist")
      }else{
        this.commonService.closeLoading();

      }
    },
    err => {
   
    }
  );
}
  async manualRedirect(val){
  //Added to restrict displaying pdf without purchasing
  console.log(val);
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
    //end to restrict displaying pdf without purchasing
  }
}
commonManual(val)
  {
    // alert(JSON.stringify(val));
    // alert(val.manualPaid);
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
                // breakpoints: [0, 0.25, 0.5, 0.75],
                    // initialBreakpoint: 0.3,
            
              })
              return await modal.present();

              // const modal = await this.modalCtrl.create({
              //   component: PurchaseinformationformComponent,
              //   componentProps: { 
              //     "sectionlist": sectionlist,
              //     "info": this.infoU,
              //     "sectionId":this.sectionId,

              //   },
              //   cssClass: 'my-custom-modal-css',
              //   swipeToClose: true,
              //   // breakpoints: [0, 0.25, 0.5, 0.75],
              //       // initialBreakpoint: 0.3,
          
              // })
              // return await modal.present();
              console.log(Response,"Response.data")
            }else{
             
            }
          },
          err => {
         
          }
        );
    // $ionicLoading.show({showBackdrop:true,template:'<ion-spinner icon="ios"></ion-spinner>  '});
    // webservice.userInfo(id,lnk).then(function(response) {
    // console.log(response.data);
    //       $ionicLoading.hide();
    //       $scope.valInfo = val;
    //       $scope.type = type;
    //       $scope.titleCourse = val.sectionName;
    //       $scope.coursePrice = val.price;
    //       $scope.sectionId = val.sectionId;
    //       $scope.infoU = response.data;
    //       $scope.modalPage3.show();  
    // })
  }

  getlink(link)
	{
		var options = {
		location: 'yes',
		clearcache: 'yes',
		toolbar: 'no'
		};
		// console.log(link);
		//alert(link);
		this.iab.create(link, '_system')
    // .then(function(event) {
		// })
		// .catch(function(event) {
		// });
	}
  back(){
    //console.log("back id",this.back_id);
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
          //   var tT = countdownTime( sVal.timelimit, 0 );
      
          //   var alertPopup = $ionicPopup.show({
          //        title: "<div class=''><b>Total Time Duration of Exam!</b></div>",
          //        template: "<div>"+tT+"</div>",
          //        scope: $scope,
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
          //               // $state.go("questionsAll",{OverId:sVal.OverId,testID:sVal.testId,timer:sVal.timelimit});
          //            }
          //          },
          //        ]
          //  });

          }else{
            // $scope.openPage8(sVal);
            this.overallRedirect(sVal)           //command just

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
      console.log(SL);
      if(SL.UserStatus == '2' || SL.UserStatus == '1')
      {
        // $scope.modalPage6.show();  
        console.log(" procter login page redirect");

        //should include procter login page redirect
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
    console.log(val);
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
            // var alertPopup = $ionicPopup.alert({
            //        title: 'Alert Pages!',
            //        template: '<p>'+val.showAlert+'</p>'
            //  });
            //  alertPopup.then(function(res) {
            //     $state.go("sidemenu.trainingcenter",{type:'individual',page:'none'});?
            //  });
            
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
    console.log(val.testId);
    if(!val.IsPay)
    {  
        this.openPage7(val);
    }else
    {
      // var tT = countdownTime( val.timelimit, 0 );
    
      //   var alertPopup = $ionicPopup.show({
      //          title: "<div class=''><b>Total Time Duration of Exam Overall!</b></div>",
      //          template: "<div>"+tT+"</div>",
      //          scope: $scope,
      //           buttons: [
      //            { text: 'Not Now',
      //               type:'button-dark',
      //               onTap: function(e) {
      //              }
      //             },
      //            {
      //              text: '<b>Continue</b>',
      //              type: 'button-royal',
      //              onTap: function(e) {
      //                 $state.go("questionsAll",{OverId:val.OverId,testID:val.testId,timer:val.timelimit});
      //              }
      //            },
      //          ]
      //    });
       
          
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
            // this.modulelist.sectionlist=this.sectionlist;
            console.log(this.modulelist,"MANUL")
          }else{
           
          }
        },
        err => {
       
        }
      );
    // webservice.userInfo(id,lnk).then(function(response) {
    // console.log(response.data);
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
 async videoRedirect(val)
  {
    console.log("saravana", val);
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
          // var alertPopup = $ionicPopup.alert({
          //        title: 'Alert Pages!',
          //        template: '<p>'+val.showAlert+'</p>'
          //  });
          //  alertPopup.then(function(res) {
          //     $state.go("sidemenu.trainingcenter",{type:'individual',page:'none'});
          //  });
          
     }
    }
  }
commonVideo(val)
  {
    // alert(JSON.stringify(val));
    // alert(val.manualPaid);
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

                  console.log(this.tAmt,"amt")
                  console.log(nid,"nid")
                   this.purchasepackage(amt,nid);

          }else{
           
          }
        },
        err => {
       
        }
      );
    // webservice.userInfo(id,lnk).then(function(response) {
    //      this.valueS = val;
    //       this.type = '';
    //       this.infoU = response.data;
    //       for(var a =0;a<val.length;a++)
    //       {
    //         if(val[a].testingPaid == '0' || val[a].testingPaid =='' || val[a].testingPaid == null)
    //         {
    //           this.tAmt = val[a].price + this.tAmt;
    //         }
    //       }
    //       $scope.modalPage4.show();  
    // })
  }

 async  purchasepackage(amt:any,nid:any){
    console.log(nid,"nid")

    const modal = await this.modalCtrl.create({
      component: PurchaseEntirePackageComponent,
      componentProps: { 
        "sectionlist": this.modulelist.sectionlist,
        "amt": amt,
        "nid":nid,
      },
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
      // breakpoints: [0, 0.25, 0.5, 0.75],
          // initialBreakpoint: 0.3,

    })
    return await modal.present();
  }

  //  async testRedirect(val)
  //   {
  //     console.log("enter");
  //     console.log(val);
       
  //           this.commonTest(val)
  
  //      }





async testRedirect(val)
  {
    console.log("enter");
    console.log(val);
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
          // var alertPopup = $ionicPopup.alert({
          //        title: 'Alert Pages!',
          //        template: '<p>'+val.showAlert+'</p>'
          //  });
          //  alertPopup.then(function(res) {
          //     $state.go("sidemenu.trainingcenter",{type:'individual',page:'none'});
          //  });
          
     }
          
     }

     async commonTest (val)
     {
       console.log(val);
       if(val.testingPaid != "0")
       {  
          var tT = this.countdownTime( val.timelimit ,0 );
          //var tT = 0;
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
                //close the modal
                this.modalCtrl.dismiss();              
              }
            },
            {
              text: "Continue",
              cssClass: 'alert-button-confirm',
              handler: () => {
                this.router.navigate([`/questions/${val.sectionId}/${val.testID}/${val.sectionName}/${val.timelimit}/${this.moduleid}/${this.back_id}`]);
                //   onTap: function(e) {
                //     $state.go("questions",{sectionId:val.sectionId,testID:val.testID,title:val.sectionName,timer:val.timelimit});
                //  }
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
        // console.log(location.sectionName,"location.sectionName")
        return location.sectionName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }
    onCancel($event){
      this.search=false;
      this.filterData=this.sectionlist
      $event.target.value = '';
    
    }
}
