import { Component, QueryList, ViewChildren } from '@angular/core';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { ModalController, Platform, PopoverController, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SignUpDetailComponent } from './sign-up-detail/sign-up-detail.component';
import { LoginService } from './../providers/login.service';

import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet)
  routerOutlets: QueryList<IonRouterOutlet>;
  type: any;
  userid: string;
  login_menu:any;
  GroupId: string;
  info: any={};
  FullName: any;
  ses_login_session: string;
  networkStatus:boolean = true;
  constructor(private network: Network,private modalCtrl:ModalController,private inAppBrowser: InAppBrowser, public platform: Platform,private menu: MenuController,private iab: InAppBrowser,private router: Router, private loginService: LoginService)
  {
    this.initializeApp();
    this.userid=localStorage.getItem('Userid');
    this.GroupId=localStorage.getItem("loginuserid");
    if(this.userid != null){
      var lnk =  'GetUser/'+this.userid;
      this.loginService.getData(lnk).then(
        (Response: any) => {
          if(this.type=="individual")
          {
            //
            this.info=Response;
            this.FullName=this.info.fullName;
          }
        },
        err => {
        }
      );
    }
    if(this.GroupId != null){
      var lnk =  'GetGroupUser?GroupId='+this.GroupId;
      this.loginService.getData(lnk).then(
        (Response: any) => {
          if(this.type!="individual")
          {
            this.info=Response.Group;
            this.FullName=this.info.First_Name;
          }
        },
        err => {
        }
      );
    }
    this.type=localStorage.getItem('type');
    this.ses_login_session=localStorage.getItem('ses_login_user');
    if(this.ses_login_session==null){
      localStorage.setItem('type',"common");
    }
    if(this.type==null){
      localStorage.setItem('type',"common");
    }
    this.type=localStorage.getItem('type');
    // this.login_menu={ title: 'Login', url: 'login', icon: 'log-in' };
    // if(!this.userid){
    // const menu=this.appPages;
    // menu.splice(4, 0,this.login_menu)
    // }else{
    //   const menu=this.appPages;
    // }
    this.backButtonEvent()
    platform.ready().then(() => {
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // localStorage.clear();
    });
  }
  ngOnInit() {

      // Watch for network status changes
      this.network.onConnect().subscribe(() => {
        console.log('Connected to the internet!');
        this.networkStatus = true;
      });

      this.network.onDisconnect().subscribe(() => {
        console.log('Disconnected from the internet!');
        this.networkStatus = false;
      });

      // Initial network status
      console.log('Initial network type:', this.network.type);



    this.userid=localStorage.getItem('Userid');
    this.GroupId=localStorage.getItem("loginuserid");
    if(this.userid != null){
      var lnk =  'GetUser/'+this.userid;
      this.loginService.getData(lnk).then(
        (Response: any) => {
          if(this.type=="individual")
          {
            this.info=Response;
            this.FullName=this.info.fullName;
          }
        },
        err => {
        }
      );
    }
    if(this.GroupId != null){
      var lnk =  'GetGroupUser?GroupId='+this.GroupId;
      this.loginService.getData(lnk).then(
        (Response: any) => {
          if(this.type!="individual")
          {
            this.info=Response.Group;
            this.FullName=this.info.First_Name;
          }
        },
        err => {
        }
      );
    }
    this.type=localStorage.getItem('type');
    this.ses_login_session=localStorage.getItem('ses_login_user');
    if(this.ses_login_session==null){
      localStorage.setItem('type',"common");
    }
    if(this.type==null){
      localStorage.setItem('type',"common");
    }
    this.type=localStorage.getItem('type');




  }
  closeMenu(){
    this.menu.close();
  }
  ionViewWillEnter() {
  }
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'My Profile', url: 'myprofile', icon: 'person' },
    { title: 'Training Center', url: 'Training-Center', icon: 'information-circle' },
    { title: 'Training Report', url: 'Training-Report', icon: 'document-text' },
    { title: 'Login', url: 'login', icon: 'log-in' },
    { title: 'Examination Guidelines', url: 'Examination-Guidelines', icon: 'book' },
    { title: 'Student Acknowledgement', url: 'Student-Acknowledgement', icon: 'mail' },
    { title: 'How App Works',click: 'openExternalUrl()', icon: 'globe' },
    { title: 'Contact Us', url: 'contactus', icon: 'call' },
    { title: 'About Us', url: 'aboutus', icon: 'people' },
    { title: 'Logout', url: 'logout', icon: 'log-out' }
  ];
 async modal_popup(){
    const modal = await this.modalCtrl.create({
      component: LoginDetailsComponent,
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
  async modal_popup2(){
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
  openExternalUrl() {
    const browser = this.inAppBrowser.create('https://shawneerct.com/manuals/123016%20SES%20Services.pdf', '_system');
  }
  logout(){
    this.type=localStorage.getItem('type');
    if(this.type=="individual"){
      this.router.navigate([`/login/${this.type}`]).then(() => {
        localStorage.clear();
        // window.location.reload();
        this.ngOnInit();
      });
    }else if(this.type=="group"){
      this.router.navigate([`/login/${this.type}`]).then(() => {
        localStorage.clear();
        // window.location.reload();
        this.ngOnInit();
      });
    }else{
      localStorage.clear();
      // this.ngOnInit();
    }
  }
  profile(){
    this.type=localStorage.getItem('type');
    if(this.type=="individual"){
      this.router.navigate([`/myprofile/${this.type}`])
    }else if(this.type=="group"){
      this.router.navigate([`/myprofile/${this.type}`])
    }
  }
  Home(){
    this.type=localStorage.getItem('type');
    if(this.type=="individual"){
      this.router.navigate([`/home/${this.type}`])
    }else if(this.type=="group"){
      this.router.navigate([`/home/${this.type}`])
    }else{
      // this.type=localStorage.setItem("type", 'common');
      this.router.navigate([`/home/common`])
    }
  }
  refreshing(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  work(){
    var link="https://shawneerct.com/manuals/123016%20SES%20Services.pdf";
    this.iab.create(link, '_system');
  }
  trainingcenter()
  {
    var uid = localStorage.getItem('Userid');
    if(uid != '')
    {
      if(uid == null)
      {
        this.router.navigate([`/login/individual`])
      }else
      {
        this.router.navigate([`/trainingcenter/`])
      }
    }else
    {
      this.router.navigate([`/login/individual`])
      // $state.go("login",{sid:'',page:'training',mouduleId:'',type:'individual'});
    }
  }
  trainingreport(){
    var uid = localStorage.getItem('Userid');
    if(uid != '')
    {
      if(uid == null)
      {
        this.router.navigate([`/login/individual`])
      }else
      {
        this.router.navigate([`/trainingreport/`])
      }
    }else
    {
      this.router.navigate([`/login/individual`])
    }
  }
  backButtonEvent() {
    document.addEventListener("backbutton", () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        }else if(this.router.url === "/home/group"){
          navigator['app'].exitApp(); // work for ionic 4
        }
        else if(this.router.url === "/home/common"){
          navigator['app'].exitApp(); // work for ionic 4
        }
        else if(this.router.url === "/home/individual"){
          navigator['app'].exitApp(); // work for ionic 4
        }
      });
    });
  }
}
