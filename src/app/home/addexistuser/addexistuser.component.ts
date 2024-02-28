import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
@Component({
  selector: 'app-addexistuser',
  templateUrl: './addexistuser.component.html',
  styleUrls: ['./addexistuser.component.scss'],
})
export class AddexistuserComponent implements OnInit {
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
    var userId, password;
    password = usign.password;
    userId = usign.userId;
    if (usign.userId == "" || usign.userId == undefined){
      this.commonService.presentToast("Enter UserId");
    }
    else if(usign.password == "" || usign.password == undefined) {
      this.commonService.presentToast("Enter Password");
    }
    else {
      var id = localStorage.getItem("loginuserid");
          var lnk='AddExistingUserToGroup';
      var data = 'userId='+userId+'&password='+password+'&Group_Id='+id+'&EIN='+this.Ein;
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
