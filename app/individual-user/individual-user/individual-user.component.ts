import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/providers/login.service';

@Component({
  selector: 'app-individual-user',
  templateUrl: './individual-user.component.html',
  styleUrls: ['./individual-user.component.scss'],
})
export class IndividualUserComponent implements OnInit {
  form: boolean=false;
  IndividualId: string;
  type: string;
  GroupId: string;
  info: any;
  usign:any={};
  constructor(public loginService:LoginService) { }

  ngOnInit() {
    this.IndividualId=localStorage.getItem("Userid");
    this.GroupId=localStorage.getItem("loginuserid");
    this.type=localStorage.getItem("type");

    this.GetGroupUser();
    this.GetCompletedCourse();
  }
  submit(){
    this.form=true;
  }
  GetGroupUser(){

    if(this.type=="group"){
      var lnk =  'GetGroupUser?GroupId='+this.GroupId;

    }else
    {
        var lnk =  'GetUser/'+this.IndividualId;
    }
    this.loginService.getData(lnk).then(
      (Response: any) => {
        console.log(Response);

        if(Response)
        {
        this.info=Response;
         
        }else{
         
        }
      },
      err => {
     
      }
    );
  } 
  GetCompletedCourse(){

    
    var lnk =  'GetCompletedCourse/?UserId='+this.IndividualId;
    
    this.loginService.getData(lnk).then(
      (Response: any) => {
        console.log(Response);

        if(Response)
        {
        this.info=Response;
         
        }else{
         
        }
      },
      err => {
     
      }
    );
  } 

  studentFormSubmission(usign,course){
  //   if (usign.studentid == "" || usign.studentid == undefined){
  //     this.commonService.presentToast("Enter First Name");
  //   }
  //   else if (usign.lastname == "" || usign.lastname == undefined){
  //     this.commonService.presentToast("Enter Last Name");
  //   }
   
  //   else if (usign.company == "" || usign.company == undefined){
  //     this.commonService.presentToast("Enter Company");
  //   }
  //   else if (usign.ein == "" || usign.ein == undefined){
  //     this.commonService.presentToast("Enter EIN");
  //   }
  //   else if (usign.email == "" || usign.email == undefined){
  //     this.commonService.presentToast("Enter Email");
  //   }
  //   else if ((await this.commonService.validateEmail(usign.email)) == false){
  //      this.commonService.presentToast("Enter Valid Email");
  //   }
  //   else if (usign.phone == "" || usign.phone == undefined){
  //     this.commonService.presentToast("Enter phone");
  //   }
  //   else if ((await this.commonService.validatephone(usign.phone)) == false){
  //      this.commonService.presentToast("Enter Valid phone");
  //   }
  //   else if(usign.password == "" || usign.password == undefined) {
  //     this.commonService.presentToast("Enter Password");
  //   }
  //   else if(usign.cpassword == "" || usign.cpassword == undefined) {
  //     this.commonService.presentToast("Enter Confrim Password");
  //   }
  //   else if (usign.password != usign.cpassword) {
  //      this.commonService.presentToast("Password and Confirm Password should be same");
  //   } else if (usign.question  == "" || usign.question == undefined){
  //     this.commonService.presentToast("Enter Question");
  //   }
  //   else if (usign.answer  == "" || usign.answer == undefined){
  //     this.commonService.presentToast("Enter an answer");
  //   }

  //   else if (usign.firstname1 == "" || usign.firstname1 == undefined){
  //     this.commonService.presentToast("Enter First Name");
  //   }
  //   else if (usign.lastname1 == "" || usign.lastname1 == undefined){
  //     this.commonService.presentToast("Enter Last Name");
  //   }
   
  //   else if (usign.email1 == "" || usign.email1 == undefined){
  //     this.commonService.presentToast("Enter Email");
  //   }
  //   else if ((await this.commonService.validateEmail(usign.email1)) == false){
  //      this.commonService.presentToast("Enter Valid Email");
  //   }
   
  //   else if(usign.password1 == "" || usign.password1 == undefined) {
  //     this.commonService.presentToast("Enter Password");
  //   }else if (usign.firstname2 == "" || usign.firstname2 == undefined){
  //     this.commonService.presentToast("Enter First Name");
  //   }
  //   else if (usign.lastname2 == "" || usign.lastname2 == undefined){
  //     this.commonService.presentToast("Enter Last Name");
  //   }
   
  //   else if (usign.email2 == "" || usign.email2 == undefined){
  //     this.commonService.presentToast("Enter Email");
  //   }
  //   else if ((await this.commonService.validateEmail(usign.email2)) == false){
  //      this.commonService.presentToast("Enter Valid Email");
  //   }
   
  //   else if(usign.password2 == "" || usign.password2 == undefined) {
  //     this.commonService.presentToast("Enter Password");
  //   }
   
  //   else {
  //     var sendPass=usign.sendPass;
  //     if(sendPass=true){
  //       sendPass=1;
  //     }else{
  //       sendPass=0;
  
  //     }
  //     console.log("test");
  //     var data = 'First_Name='+usign.firstname+'&Last_Name='+usign.lastname+'&Company_Name='+usign.company+'&Email='+usign.email+'&EIN='+usign.ein+'&Phone='+usign.phone+'&Password='+usign.password+'&Hint_Question='+usign.question+'&Hint_Answer='+usign.answer+'&FirstName1='+usign.firstname1+'&LastName1='+usign.lastname1+'&Password1='+usign.password1+'&Email1='+usign.email1+'&FirstName2='+usign.firstname2+'&LastName2='+usign.lastname2+'&Password2='+usign.password2+'&Email2='+usign.email2;
  //     this.commonService.presentLoading();
  //     this.loginService.Signup_group(data,sendPass).then((Response: any) => {
  //       this.type_user="groupregister";
  //        console.log(Response);
  //        if(Response.Status == 'Success'){
  //         console.log(this.type_user);

  //          this.commonService.closeLoading();
  //             // this.signupdetails = Response.data[0];
  //             // console.log(this.signupdetails);
  //         //  this.commonService.presentToast(Response.Message);
  //          this.presentAlert(Response.Message,this.type_user);
  //        }else{
  //         this.commonService.presentToast(Response.Message);
  //          this.commonService.closeLoading();
  //        }
  //      },
  //      err => {
  //        this.commonService.closeLoading();
  //        this.commonService.presentToast(`Connection error`);
  //      }
  //    );
  //   }   
  // }
  // }
}
}
