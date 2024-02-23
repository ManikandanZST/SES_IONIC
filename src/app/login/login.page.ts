import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../providers/common.service';
import { LoginService } from '../../providers/login.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { SignUpDetailComponent } from '../sign-up-detail/sign-up-detail.component';
import { AuthService } from 'src/providers/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ulogin:any=[];
  status: number;
  userid: string;
  userdata: any;
  emailval: any;
  id: any;
  type: any;
  showPassword = false;
  inputtype: any;
  constructor(public router:Router, private commonService: CommonService,public app: AppComponent,private modalCtrl:ModalController,private activatedRoute: ActivatedRoute, private loginService: LoginService) { 
    this.activatedRoute.params.subscribe(params => {
      // console.log(params['id']);
      this.type=params['id'];
 });
   

  }

  ngOnInit() {
    this.inputtype = "password";
  }

  SignIn(ulogin)
  {
    if(this.type=="individual"){
    if (ulogin.userId == "" || ulogin.userId == undefined) {
      this.commonService.presentToast("Enter userId");
      console.log("test");
    } else if(ulogin.password == "" || ulogin.password == undefined) {
      console.log("test3");
      this.commonService.presentToast("Enter Password");
    }else{
      var data = "userId="+ulogin.userId+"&password="+ulogin.password;
     this.commonService.presentLoading();
     this.loginService.Signin(data).then(
       (Response: any) => {
         if(Response.Status == 'Success')
         {
          console.log(Response);
           this.commonService.closeLoading();
           this.commonService.presentToast('Login Sucessfully');
           var appid = localStorage.getItem("SesdeviceLocal");
           var fcmid = localStorage.getItem("SesTokenLocal")
           localStorage.setItem("type", this.type);
           localStorage.setItem("ProctID","");
           localStorage.setItem("ses_login_user", '0');

           
           localStorage.setItem("SesdeviceLocal", appid);
           localStorage.setItem("SesTokenLocal", fcmid);
             
           localStorage.setItem("Userid",ulogin.userId);
           localStorage.setItem("Userdata",JSON.stringify(Response));
           this.status = 0;
           this.ulogin = {email:'',password:''};
           this.userid = localStorage.getItem("Userid");
           this.userdata =  JSON.parse(localStorage.getItem("Userdata"));
          //  this.router.navigate([`/home/${this.type}`]).then(() => {
          //   window.location.reload();
          // this.refresher.emit();
          // this.authservice.login().subscribe(() => {
            // Call ngOnInit of the AppComponent
            this.app.ngOnInit();
          // });

          // });
          this.router.navigate([`/examguidence`]).then(() => {
            this.app.ngOnInit();

            // window.location.reload();
            // this.refresher.emit();


          });
        }else{
          // console.log(Response);

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
  }else if(this.type=="group"){
    if (ulogin.userId == "" || ulogin.userId == undefined) {
      this.commonService.presentToast("Enter Company Name");
    } else if(ulogin.password == "" || ulogin.password == undefined) {
      this.commonService.presentToast("Enter Password");
    }else{
      var data = "Company_Name="+ulogin.userId+"&password="+ulogin.password;
     this.commonService.presentLoading();
     this.loginService.Signin_group(data).then(
       (Response: any) => {
         if(Response.Status == 'Success')
         {
          console.log(Response);
           this.commonService.closeLoading();
           this.commonService.presentToast('Login Sucessfully');
           localStorage.setItem("ses_login_user", '0');

           localStorage.setItem("type", this.type);

           localStorage.setItem('loginuserid',Response.Message);
           localStorage.setItem("Userid",Response.$id);
           localStorage.setItem("Userdata",JSON.stringify(Response));
           this.status = 0;
           this.ulogin = {email:'',password:''};
           this.userid = localStorage.getItem("Userid");
           this.userdata =  JSON.parse(localStorage.getItem("Userdata"));
           this.router.navigate([`/home/${this.type}`]).then(() => {
            this.app.ngOnInit();

            // window.location.reload();
          });

         }else{
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
  }
 async modal_popup(){
  console.log("test");
    const modal = await this.modalCtrl.create({
      component: SignUpDetailComponent,
      componentProps: { 
        // "court": this.club,
        // court: "Test Title",
      },
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
      // breakpoints: [0, 0.25, 0.5, 0.75],
          initialBreakpoint: 0.3,

    })
    return await modal.present();
  }
  back(){
    this.router.navigate([`home/common`])
  }
  toggleShow() {
    console.log("tested");
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
    this.inputtype = this.showPassword ? 'text' : 'password';
    console.log(this.inputtype);
  }
  Forgot(){
    if(this.type=="individual"){
      this.router.navigate([`/forgotpassword/${this.type}`])      
    }else if(this.type=="group"){      
      this.router.navigate([`/forgotpassword/${this.type}`])
    }
  }  
}
