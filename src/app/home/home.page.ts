import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoginService } from 'src/providers/login.service';
import { EmployeereportComponent } from '../employeereport/employeereport.component';
import { PopoverComponent } from '../popover/popover.component';
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
  constructor(private activatedRoute: ActivatedRoute,public router:Router,public popOver: PopoverController,private loginService: LoginService,public modalCtrl:ModalController) {
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
  }
