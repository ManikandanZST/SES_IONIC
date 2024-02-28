import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.scss'],
})
export class AddnewuserComponent implements OnInit {
  usign:any={  };
  GroupId: string;
  Ein: any;
  type: string;
  constructor(public commonService:CommonService,public loginService:LoginService,public router:Router) { }
  ngOnInit() {
    this.GroupId=localStorage.getItem("loginuserid");
    this.type=localStorage.getItem("type");
    this.GetGroupUser();
  }
  GetGroupUser(){
    var lnk =  'GetGroupUser?GroupId='+this.GroupId;
  this.loginService.getData(lnk).then(
    (Response: any) => {
      if(Response)
      {
      this.Ein=Response.Group.EIN;
      }else{
      }
    },
    err => {
    }
  );
}
  async AddnewUser(usign,modal){
    var fname1 ,lname1, password1,email1;
    fname1 = usign.fname1;
    lname1 = usign.lname1;
    password1 = usign.password1;
    email1 = usign.email1;
    if (usign.fname1 == "" || usign.fname1 == undefined){
      this.commonService.presentToast("Enter First Name");
    }
    else if (usign.lname1  == "" || usign.lname1 == undefined){
      this.commonService.presentToast("Enter Last Name");
    }
    else if(usign.password1 == "" || usign.password1 == undefined) {
      this.commonService.presentToast("Enter Password");
    }
    else if (usign.email1 == "" || usign.email1 == undefined){
      this.commonService.presentToast("Enter Email");
    }
    else if ((await this.commonService.validateEmail(usign.email1)) == false){
       this.commonService.presentToast("Enter Valid Email");
    }
    else {
      var id = localStorage.getItem("loginuserid");
          var lnk='AddNewUserToGroup';
      var data = 'fullName='+fname1+' '+lname1+'&email='+email1+'&password='+password1+'&Group_Id='+id+'&EIN='+this.Ein;
      this.commonService.presentLoading();
      this.loginService.postdata(data,lnk).then((Response: any) => {
         if(Response.Status == 'Success'){
           this.commonService.closeLoading();
           this.commonService.presentToast(Response.Message);
           this.router.navigate([`/home/${this.type}/employeelist`]);
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
  close(){
    this.router.navigate([`/home/${this.type}/employeelist`]);
  }
}
