import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
@Component({
  selector: 'app-editgroupuser',
  templateUrl: './editgroupuser.component.html',
  styleUrls: ['./editgroupuser.component.scss'],
})
export class EditgroupuserComponent implements OnInit {
@Input("id") id;
  edituser: any={};
  type: string;
  constructor(private loginService:LoginService,private commonService:CommonService,
    public modalctrl:ModalController,public router:Router) { }
  ngOnInit() {
    this.GetGroupUser();
    this.type=localStorage.getItem("type")
  }
  GetGroupUser(){
    var lnk =  'GetUser/'+this.id;
    this.loginService.getData(lnk).then(
    (Response: any) => {
      if(Response)
      {
      this.edituser=Response;
      }else{
      }
    },
    err => {
    }
  );
}
async updateUserInfo(dusers){
  var name   = dusers.fullName;
  var company    = dusers.company;
  var ssn    = dusers.SSN;
  var email    = dusers.email;
  var phone   = dusers.phone;
  var hint    = dusers.question;
  var answer    = dusers.answer;
  var comment    = dusers.comment;
var url="UpdateNormalUser/"
  if (dusers.fullName == "" || dusers.fullName == undefined) {
    this.commonService.presentToast("Enter Name");
  } else if(dusers.password == "" || dusers.password == undefined) {
    this.commonService.presentToast("Enter Password");
  }else if (dusers.email == "" || dusers.email == undefined){
    this.commonService.presentToast("Enter Email");
  }
  else if ((await this.commonService.validateEmail(dusers.email)) == false){
     this.commonService.presentToast("Enter Valid Email");
  }else{
    var data = 'fullName='+name+'&company='+company+'&SSN='+ssn+'&email='+email+'&question='+hint+'&answer='+answer+'&userId='+this.id+'&comment='+comment+'&phone='+phone;
    this.commonService.presentLoading();
    this.loginService.postdata(data,url).then((Response: any) => {
       if(Response.Status == 'Success'){
         this.commonService.closeLoading();
         this.commonService.presentToast(Response.Message);
         this.close().then(()=>{
          window.location.reload();
        });
       }else{
        this.commonService.presentToast(Response.Message);
         this.commonService.closeLoading();
       }
     },
     err => {
       this.commonService.closeLoading();
       this.commonService.presentToast(`Connection error`);
     }
   );
  }
  }
  async close(){
    await this.modalctrl.dismiss();
  }
  back(){
this.modalctrl.dismiss();
  }
}
