import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from '../popover/popover.component';
// import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  type: any;
  GroupId: string;
  info: any={};
  CustomersForm: any = {};
  editprofile: boolean = false;
  name: any;
  FullName: any;
  Email: any;
  lastname: any;
  Phone: any;
  Company_Name: any;
  Ein: any;
  Hint_Answer: any;
  Hint_Question: any;
  IndividualId: string;
  SSN: any;

  constructor(private activatedRoute: ActivatedRoute,private loginService: LoginService,private common: CommonService,public popOver: PopoverController) {
    this.activatedRoute.params.subscribe(params => {
      
      this.type=params['type'];
      

 });
  }

  ngOnInit() {
    this.GroupId=localStorage.getItem("loginuserid");
    this.IndividualId=localStorage.getItem("Userid");
    this.GetGroupUser();
  }

  GetGroupUser(){
    this.common.presentLoading();
    if(this.type=="group"){
      var lnk =  'GetGroupUser?GroupId='+this.GroupId;

    }else
    {
        var lnk =  'GetUser/'+this.IndividualId;
    }
    this.loginService.getData(lnk).then(
      (Response: any) => {
        
        this.common.closeLoading();
        if(this.type=="individual")
        {
          
          this.info=Response;
          this.FullName=this.info.fullName;
          this.Email=this.info.email;
          this.Phone=this.info.phone;
          this.Company_Name=this.info.company;
          this.SSN=this.info.SSN;
          this.Ein=this.info.EIN;
          this.Hint_Answer=this.info.answer;
          this.Hint_Question=this.info.question;
        }else{
          
          this.info=Response.Group;
          this.FullName=this.info.First_Name + this.info.Last_Name;
          this.Email=this.info.Email;
          this.Phone=this.info.Phone;
          this.Company_Name=this.info.Company_Name;
          this.Ein=this.info.EIN;
          this.Hint_Answer=this.info.Hint_Answer;
          this.Hint_Question=this.info.Hint_Question;
        }
      },
      err => {

      }
    );
  }

  Editprofile(event:any){
    this.editprofile = true;
    if(this.type == "individual")
    {
      
      this.CustomersForm.firstname=this.info.fullName;
      this.CustomersForm.email=this.info.email;
      this.CustomersForm.phone=this.info.phone;
      this.CustomersForm.Company_Name=this.info.company ;
      this.CustomersForm.SSN=this.info.SSN ;
      this.CustomersForm.Comment=this.info.comment;
      this.CustomersForm.Hint_Answer=this.info.answer ;
      this.CustomersForm.Hint_Question=this.info.question ;
    }
    else
    {
      
      this.CustomersForm.firstname=this.info.First_Name;
      this.CustomersForm.lastname=this.info.Last_Name;
      this.CustomersForm.email=this.info.Email;
      this.CustomersForm.phone=this.info.Phone;
      this.CustomersForm.Company_Name=this.info.Company_Name ;
      this.CustomersForm.Ein=this.info.EIN ;
      this.CustomersForm.Hint_Answer=this.info.Hint_Answer ;
      this.CustomersForm.Hint_Question=this.info.Hint_Question ;
    }

    

  }

  async customerRegistration() {
    if (this.CustomersForm.firstname == null || this.CustomersForm.firstname == '') {
      this.common.presentToast('Enter your First name')
    } else if (this.type == "group" && (this.CustomersForm.lastname == null || this.CustomersForm.lastname == '')) {
      this.common.presentToast('Enter your Last name');
    }else if (this.CustomersForm.email == null || this.CustomersForm.email == '') {
      this.common.presentToast('Enter your email address');
    } else if (await this.common.validateEmail(this.CustomersForm.email) == false) {
      this.common.presentToast('Enter valid email address');
    }else if (this.CustomersForm.phone == null || this.CustomersForm.phone == '') {
      this.common.presentToast('Enter your phone number');
    } else if (await this.common.validateMobileNumber(this.CustomersForm.phone) == false) {
      this.common.presentToast('Enter valid phone number');
    }else if (this.CustomersForm.Company_Name == null || this.CustomersForm.Company_Name == '') {
      this.common.presentToast('Enter your Company Name');
    }else if (this.type == "individual" && (this.CustomersForm.SSN == null || this.CustomersForm.SSN == '')) {
      this.common.presentToast('Enter your SSN');
    }else if (this.type == "group" && (this.CustomersForm.Ein == null || this.CustomersForm.Ein == '')) {
      this.common.presentToast('Enter your Ein');
    }else if (this.CustomersForm.Hint_Question == null || this.CustomersForm.Hint_Question == '') {
      this.common.presentToast('Enter your question');
    }else if (this.CustomersForm.Hint_Answer == null || this.CustomersForm.Hint_Answer == '') {
      this.common.presentToast('Enter your Answer');
    }
    else {

      if(this.type == "individual")
      {
        this.common.presentLoading();
        
        this.CustomersForm.IndividualId = this.IndividualId;

        var data = 'fullName='+this.CustomersForm.firstname+'&company='+this.CustomersForm.Company_Name+'&SSN='+this.CustomersForm.SSN+'&email='+this.CustomersForm.email+'&question='+this.CustomersForm.Hint_Question+'&answer='+this.CustomersForm.Hint_Answer+'&userId='+this.CustomersForm.IndividualId+'&comment='+this.CustomersForm.Comment+'&phone='+this.CustomersForm.phone;

        this.loginService.profile_individual(data).then((res) => {
          
          if (res.Status == 'Success') {
            this.common.closeLoading();
            this.common.presentToast('Updated Successfully');
            this.editprofile = false;
            // window.location.reload();
            this.GetGroupUser();
          } else {
            // this.alert.errorMsg(res.error, '');
            this.common.closeLoading();
            this.common.presentToast(`Connection error`);
          }
        }, err => {
          
          this.common.closeLoading();
          this.common.presentToast(`Connection error`);
          // this.alert.errorMsg('Connection Error', '');
        });
      }
      else
      {
        this.common.presentLoading();
        
        this.CustomersForm.groupid = this.GroupId;

        var data= 'Group_Id='+this.GroupId+'&First_Name='+this.CustomersForm.firstname+'&Last_Name='+this.CustomersForm.lastname+'&Email='+this.CustomersForm.email+'&EIN='+this.CustomersForm.Ein+'&Phone='+this.CustomersForm.phone+'&Hint_Question='+this.CustomersForm.Hint_Question+'&Hint_Answer='+this.CustomersForm.Hint_Answer;

        this.loginService.profile_group(data).then((res) => {

          if (res.Status == 'Success') {
            this.common.closeLoading();
            this.common.presentToast('Updated Successfully');
            this.editprofile = false;
            // window.location.reload();
            this.GetGroupUser();
          } else {
            // this.alert.errorMsg(res.error, '');
            this.common.closeLoading();
          }
        }, err => {
          
          this.common.closeLoading();
          this.common.presentToast(`Connection error`);
          // this.alert.errorMsg('Connection Error', '');
        });
      }

    }
  }

  // popoverOptions = {
  //   cssClass: 'my-select',
  //   height: '200px'
  // };



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

  cancelevent(){
    this.editprofile = false;
    this.ngOnInit();
  }
}
