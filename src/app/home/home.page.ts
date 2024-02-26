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
      console.log(params);
      this.type=params['type'];
      console.log(this.type);
      // this.myTimeout= setTimeout(() => {
      //   window.location.reload();
      //   console.log("test56tt")

      // }, 2000);
      // this.clear();

    });
  }

  ngOnInit() {
   this.IndividualUserId=localStorage.getItem('Userid');
   //console.log("User ID", this.IndividualUserId);
   this.type=localStorage.getItem('type');
   //console.log("Home page - type", this.type);
   if(this.type=='individual'){
    this.router.navigate([`home/${this.type}`]); //
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
    console.log("testtttt")


  }
  clear(){
    console.log("test22")

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
//Individual use
  getcourse(){
    var id='0';
      var lnk =  'GetCourses?id='+id;
      this.loginService.getData(lnk).then(
      (Response: any) => {

        if(Response)
        {
          this.courselist=Response;
          console.log(this.courselist.Course,"courselist")
        }else{

        }
      },
      err => {

      }
    );
  }
  trainingcourse(id){
    console.log(id);
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
      console.log(this.type);
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
