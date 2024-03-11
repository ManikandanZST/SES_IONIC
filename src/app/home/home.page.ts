import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { LoginService } from 'src/providers/login.service';
import { EmployeereportComponent } from '../employeereport/employeereport.component';
import { PopoverComponent } from '../popover/popover.component';
import { CommonService } from 'src/providers/common.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  type: any;
  info: any;
  GroupId: string;
  myTimeout: any;
  messageSuccess: boolean=false;
  IndividualUserId: string;
  courselist: any={};
  id: string;
  constructor(private activatedRoute: ActivatedRoute,private commonService: CommonService, public alertController: AlertController, private popoverController: PopoverController,public router:Router,public popOver: PopoverController,private loginService: LoginService,public modalCtrl:ModalController) {
    this.activatedRoute.params.subscribe(params => {
      this.type=params['type'];
    });
  }
  ngOnInit() {
   this.IndividualUserId=localStorage.getItem('Userid');
   this.type=localStorage.getItem('type');
   if(this.type=='individual'){
    this.router.navigate([`home/${this.type}`]);
    this.getcourse();
   }
   else if(this.type=='common'){
    this.getcourse();
   }
   else if(this.type=='group'){
    this.router.navigate([`home/${this.type}`]);
   }
  }
  ionViewDidEnter(){
  }
  clear(){
    clearTimeout(this.myTimeout);
  }
  purchasecourse(){
    this.router.navigate([`home/${this.type}/purchasecourse`]);
  }
  purchaseexam(){
    this.router.navigate([`home/${this.type}/purchaseexam`]);
  }
  purchasevaluepacks(){
    this.router.navigate([`home/${this.type}/purchasevaluepack`]);
  }
  purchaseoverall(){
    this.router.navigate([`home/${this.type}/purchaseoverall`]);
  }
  employeelist(){
    this.router.navigate([`home/${this.type}/employeelist`]);
  }
  async employeereport(){
    const modal = await this.modalCtrl.create({
      component: EmployeereportComponent,
      componentProps: {
      },
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
          initialBreakpoint: 0.3,
    })
    return await modal.present();
  }
  getcourse(){
    var id='0';
      var lnk =  'GetCourses?id='+id;
      this.loginService.getData(lnk).then(
      (Response: any) => {
        if(Response)
        {
          this.courselist=Response;
        }else{
        }
      },
      err => {
      }
    );
  }
  trainingcourse(id){
    this.router.navigate([`/home-inner/${id}`])
  }
  async showPopover(ev: any) {
    const popover = await this.popOver.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
    });
    popover.onDidDismiss().then(data=>{
      if(data !=null){
      }
    })
    await popover.present();
  }
    logout(){
      this.type=localStorage.getItem('type');
      if(this.type=="individual"){
        this.router.navigate([`/login/${this.type}`]).then(() => {
          localStorage.clear();
          window.location.reload();
        });
      }else if(this.type=="group"){
        this.router.navigate([`/login/${this.type}`]).then(() => {
          localStorage.clear();
          window.location.reload();
        });
      }
    }

    async presentAlertConfirmdelete() {
      await this.popoverController.dismiss();
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class1',
        header: 'Are you sure to delete your account?',
        // message: 'Message <strong>text</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'button_ok',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Ok',
            cssClass: 'button_cancel',
            handler: ()=>{
              this.delete_user();
              setTimeout(() => {
                this.router.navigate(['/login'])
                window.localStorage.setItem("username", '');
                window.localStorage.setItem("password'",'');
                localStorage.setItem("UserId", '');
                localStorage.setItem("password", '');
                localStorage.setItem("email", '');

              }, 400);
            }
          }
        ]
      });

      await alert.present();
    }

    async delete_user(){

      // let data = {
      //   web_id: this.id,
      //   // email:this.email
      // }
      if(this.type=="individual"){
        this.id =  localStorage.getItem('Userid');;
        var data = "userId="+this.id;

        this.loginService.deleteuser(data).then(res => {
          console.log(res,"assinn")
        if (res.Status == 'Success') {
          // console.log(res),"assin";
          this.commonService.presentToast("Account deleted suceessfully");
          setTimeout(() => {
            this.logout();
            localStorage.clear();

          }, 400);

        }else {
          // this.common.presentToast(res.error)
          this.commonService.presentToast("Try again later!");

        }
      })
     }
     if(this.type=="group"){
      this.id =  localStorage.getItem('loginuserid');;
      var data = "Group_Id="+this.id;

      this.loginService.deletegroupuser(data).then(res => {
        console.log(res,"assinn")
      if (res.Status == 'Success') {
        // console.log(res),"assin";
        this.commonService.presentToast("Account deleted suceessfully");
        setTimeout(() => {
          this.logout();
          localStorage.clear();

        }, 400);

      }else {
        // this.common.presentToast(res.error)
        this.commonService.presentToast("Try again later!");

      }
    })
     }


    }
  }
