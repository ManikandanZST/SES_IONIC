import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  question = {
    options: ["Individual Rate Email Quote", "Group Rate Email Quote"]
  };
  usign:any={  };
  emailval: any;
  phnval: any;
  formstatus: number;
  signupdetails: any;
  type: any;
  checkedItems = []
  type_user: any;
  rand_num1: any;
  rand_num2: any;
  result: any;

  constructor(private commonService:CommonService, private router: Router, private loginService: LoginService,    public alertController: AlertController,    private activatedRoute: ActivatedRoute,) { 
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.type=params['id'];
 });
  }

  ngOnInit() {
    var randNumber1 = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    var randNumber2 = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    this.rand_num1 = randNumber1;
    this.rand_num2 = randNumber2;  
    this.result = +this.rand_num1 + +this.rand_num2;  
  }
 onChange(item) {
    if(this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value)=>value!=item);
      // console.log(this.checkedItems)

    } else {
      this.checkedItems.push(item)
      // console.log(this.checkedItems)
    }
    console.log(this.checkedItems[0])

  }
  
  
  async SignUp(usign)
  {
   if(this.type=="register"){
    
    console.log("TEST11");
    if (usign.fullname == "" || usign.fullname == undefined){
      this.commonService.presentToast("Enter Name");
    }
    else if (usign.email == "" || usign.email == undefined){
      this.commonService.presentToast("Enter Email");
    }
    else if ((await this.commonService.validateEmail(usign.email)) == false){
       this.commonService.presentToast("Enter Valid Email");
    }
    else if (usign.phone == "" || usign.phone == undefined){
      this.commonService.presentToast("Enter phone");
    }
    else if ((await this.commonService.validatephone(usign.phone)) == false){
       this.commonService.presentToast("Enter Valid phone");
    }   
    else if(usign.password == "" || usign.password == undefined) {
      this.commonService.presentToast("Enter Password");
    }
    else if(usign.cpassword == "" || usign.cpassword == undefined) {
      this.commonService.presentToast("Enter Confrim Password");
    }
    else if (usign.password != usign.cpassword) {
       this.commonService.presentToast("Password and Confirm Password should be same");
    }
   
    else if (usign.answer  == "" || usign.answer == undefined){
      this.commonService.presentToast("Enter an answer");
    }
    else if (usign.comments  == "" || usign.comments == undefined){
      this.commonService.presentToast("Enter Comments");
    }
    else if(usign.captcha == "" || usign.captcha == undefined){
      this.commonService.presentToast("Incorrect Captcha. Enter Valid Number!");
    }else if(this.result != usign.captcha){                        
        this.commonService.presentToast("Incorrect Captcha. Enter Valid Number!");
    }
    else {    
      var sendPass=usign.sendPass;
      if(sendPass=true){
        sendPass=1;
      }else{
        sendPass=0;
  
      }
      if(this.checkedItems[0]=="Individual Rate Email Quote"){
        usign.individual=1;
        usign.groupRate=0;
  
      }else{
        usign.individual=0;
        usign.groupRate=1;
      }
      console.log("test");
      var data = 'fullName='+usign.fullname+'&company='+usign.company+'&SSN='+usign.SSN+'&email='+usign.email+'&password='+usign.password+'&groupRate='+usign.groupRate+'&individual='+usign.individual+'&comment='+usign.comments+'&question='+usign.question+'&answer='+usign.answer+'&Phone='+usign.phone;
      this.commonService.presentLoading();
      this.loginService.Signup(data,sendPass).then((Response: any) => {
        this.type_user="individual";
         console.log(Response);
         if(Response.Status == 'Success'){
          console.log(this.type_user);

           this.formstatus = 2;
           this.commonService.closeLoading();
              // this.signupdetails = Response.data[0];
              // console.log(this.signupdetails);
          //  this.commonService.presentToast(Response.Message);
           this.presentAlert(Response.Message,this.type_user);
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
  else if(this.type=="proctorregister"){
    console.log("TEST1123");

    console.log(usign);
    if (usign.fullname == "" || usign.fullname == undefined){
      this.commonService.presentToast("Enter Name");
    }
    else if (usign.email == "" || usign.email == undefined){
      this.commonService.presentToast("Enter Email");
    }
    else if ((await this.commonService.validateEmail(usign.email)) == false){
       this.commonService.presentToast("Enter Valid Email");
    }
    else if (usign.phone == "" || usign.phone == undefined){
      this.commonService.presentToast("Enter phone");
    }
    else if ((await this.commonService.validatephone(usign.phone)) == false){
       this.commonService.presentToast("Enter Valid phone");
    }   
    else if(usign.address == "" || usign.address == undefined) {
      this.commonService.presentToast("Enter Address");
    }
    else if(usign.city == "" || usign.city == undefined) {
      this.commonService.presentToast("Enter City");
    }
    else if (usign.state  == "" || usign.state == undefined){
      this.commonService.presentToast("Enter State");
    }
    else if (usign.country  == "" || usign.country == undefined){
      this.commonService.presentToast("Enter Country");
    }
     else if (usign.zipcode  == "" || usign.zipcode == undefined){
      this.commonService.presentToast("Enter Zipcode");
    } 
    else if (usign.certification  == "" || usign.certification == undefined){
      this.commonService.presentToast("Enter Certification");
    }
    else if(usign.captcha == "" || usign.captcha == undefined){
      this.commonService.presentToast("Enter value");
    }else if(this.result != usign.captcha){                        
      this.commonService.presentToast("Incorrect Captcha. Enter Valid Number!");
    }
    else {
      var data = 'Name='+usign.fullname+'&Email='+usign.email+'&Address='+usign.address+'&City='+usign.city+'&State='+usign.state+'&Country='+usign.country+'&Zipcode='+usign.zipcode+'&Phone='+usign.phone+'&Certification='+usign.certification+'&Active='+false;
      this.commonService.presentLoading();
      this.loginService.Signup_ProctorReg(data).then((Response: any) => {
        this.type_user="proctorregister";
         console.log(Response);
         if(Response.Status == 'Success'){
          console.log(this.type_user);
           this.commonService.closeLoading();
           this.presentAlert(Response.Message,this.type_user);
         }else{
          console.log(Response);

           this.commonService.closeLoading();
           this.commonService.presentToast(Response.Message);
         }
       },
       err => {
        console.log(Response);

         this.commonService.closeLoading();
         this.commonService.presentToast(`Connection error`);
       }
     );
    }   
  }else if(this.type=="groupregister"){
    if (usign.firstname == "" || usign.firstname == undefined){
      this.commonService.presentToast("Enter First Name");
    }
    else if (usign.lastname == "" || usign.lastname == undefined){
      this.commonService.presentToast("Enter Last Name");
    }
   
    else if (usign.company == "" || usign.company == undefined){
      this.commonService.presentToast("Enter Company");
    }
    else if (usign.ein == "" || usign.ein == undefined){
      this.commonService.presentToast("Enter EIN");
    }
    else if (usign.email == "" || usign.email == undefined){
      this.commonService.presentToast("Enter Email");
    }
    else if ((await this.commonService.validateEmail(usign.email)) == false){
       this.commonService.presentToast("Enter Valid Email");
    }
    else if (usign.phone == "" || usign.phone == undefined){
      this.commonService.presentToast("Enter phone");
    }
    else if ((await this.commonService.validatephone(usign.phone)) == false){
       this.commonService.presentToast("Enter Valid phone");
    }
    else if(usign.password == "" || usign.password == undefined) {
      this.commonService.presentToast("Enter Password");
    }
    else if(usign.cpassword == "" || usign.cpassword == undefined) {
      this.commonService.presentToast("Enter Confrim Password");
    }
    else if (usign.password != usign.cpassword) {
       this.commonService.presentToast("Password and Confirm Password should be same");
    } else if (usign.question  == "" || usign.question == undefined){
      this.commonService.presentToast("Enter Question");
    }
    else if (usign.answer  == "" || usign.answer == undefined){
      this.commonService.presentToast("Enter an answer");
    }

    else if (usign.firstname1 == "" || usign.firstname1 == undefined){
      this.commonService.presentToast("Enter First Name");
    }
    else if (usign.lastname1 == "" || usign.lastname1 == undefined){
      this.commonService.presentToast("Enter Last Name");
    }
   
    else if (usign.email1 == "" || usign.email1 == undefined){
      this.commonService.presentToast("Enter Email");
    }
    else if ((await this.commonService.validateEmail(usign.email1)) == false){
       this.commonService.presentToast("Enter Valid Email");
    }
   
    else if(usign.password1 == "" || usign.password1 == undefined) {
      this.commonService.presentToast("Enter Password");
    }else if (usign.firstname2 == "" || usign.firstname2 == undefined){
      this.commonService.presentToast("Enter First Name");
    }
    else if (usign.lastname2 == "" || usign.lastname2 == undefined){
      this.commonService.presentToast("Enter Last Name");
    }
   
    else if (usign.email2 == "" || usign.email2 == undefined){
      this.commonService.presentToast("Enter Email");
    }
    else if ((await this.commonService.validateEmail(usign.email2)) == false){
       this.commonService.presentToast("Enter Valid Email");
    }
   
    else if(usign.password2 == "" || usign.password2 == undefined) {
      this.commonService.presentToast("Enter Password");
    }
    
    else if(usign.captcha == "" || usign.captcha == undefined){
      this.commonService.presentToast("Incorrect Captcha. Enter Valid Number!");
    }
    
    else if(this.result != usign.captcha){                        
      this.commonService.presentToast("Incorrect Captcha. Enter Valid Number!");
    }

    else {
      var sendPass=usign.sendPass;
      if(sendPass=true){
        sendPass=1;
      }else{
        sendPass=0;
  
      }
      console.log("test");
      var data = 'First_Name='+usign.firstname+'&Last_Name='+usign.lastname+'&Company_Name='+usign.company+'&Email='+usign.email+'&EIN='+usign.ein+'&Phone='+usign.phone+'&Password='+usign.password+'&Hint_Question='+usign.question+'&Hint_Answer='+usign.answer+'&FirstName1='+usign.firstname1+'&LastName1='+usign.lastname1+'&Password1='+usign.password1+'&Email1='+usign.email1+'&FirstName2='+usign.firstname2+'&LastName2='+usign.lastname2+'&Password2='+usign.password2+'&Email2='+usign.email2;
      this.commonService.presentLoading();
      this.loginService.Signup_group(data,sendPass).then((Response: any) => {
        this.type_user="groupregister";
         console.log(Response);
         if(Response.Status == 'Success'){
          console.log(this.type_user);

           this.commonService.closeLoading();
              // this.signupdetails = Response.data[0];
              // console.log(this.signupdetails);
          //  this.commonService.presentToast(Response.Message);
           this.presentAlert(Response.Message,this.type_user);
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
  }

  

  async presentAlert(response,type) {
    console.log(type,"testinftf")
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Thanks For Registering!',
      message: '<p>'+response+'</p>',
      buttons: [
        {
          text: "Okay",
          cssClass: 'alert-button-confirm',
          handler: () => {
            if(type=="individual"){
              this.router.navigate([`/login/individual`])
            }else if(type=="proctorregister"){
              this.router.navigate([`/home`])
            }else if(type=="groupregister"){
              this.router.navigate([`/login/group`])
            }
          }
        }
      ]
    });
    await alert.present();
  }
  back(){
    this.router.navigate(['home/common'])
  }
}

  // sumbitSignup(usign:any)
  // {
  //   var sendPass=usign.sendPass;
  //   if(sendPass=true){
  //     sendPass=1;
  //   }else{
  //     sendPass=0;

  //   }
  //   if(this.checkedItems[0]=="Individual Rate Email Quote"){
  //     usign.individual=1;
  //     usign.groupRate=0;

  //   }else{
  //     usign.individual=0;
  //     usign.groupRate=1;
  //   }
  //   console.log("test");
  //   var data = 'fullName='+usign.fullname+'&company='+usign.company+'&SSN='+usign.SSN+'&email='+usign.email+'&password='+usign.password+'&groupRate='+usign.groupRate+'&individual='+usign.individual+'&comment='+usign.comments+'&question='+usign.question+'&answer='+usign.answer+'&Phone='+usign.phone;
  //   this.commonService.presentLoading();
  //   this.loginService.Signup(data,sendPass).then((Response: any) => {
  //      console.log(Response);
  //      if(Response.status == 'success'){
  //        this.formstatus = 2;
  //        this.commonService.closeLoading();
  //           this.signupdetails = Response.data[0];
  //           console.log(this.signupdetails);
  //        this.commonService.presentToast(Response.Message);
  //      }else{
  //        this.commonService.closeLoading();
  //        this.commonService.presentToast(Response.Message);
  //      }
  //    },
  //    err => {
  //      this.commonService.closeLoading();
  //      this.commonService.presentToast(`Connection error`);
  //    }
  //  );
  // }

