import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CreditCardService } from 'src/providers/creditCard.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  @Input ("amount") amount;
  @Input ("valueS") valueS;
  @Input ("nid") nid;
  @Input ("payInfoamount") payInfoamount;
  @Input ("sectionId") sectionId;
  @Input ("ValueAmount") ValueAmount;
  @Input ("ValueId") ValueId;
  @Input ("coursePrice") coursePrice;
  @Input ("OverId") OverId;



  total: string;
  groupuser_NAMEs: any;
  groupusers: any;
  GroupId: string;
  usign:any=[];
  type: string;
  section: any;

  constructor(private loginService: LoginService, public modalController: ModalController,
    private commonService:CommonService,private router: Router,public alertController: AlertController,
       private activatedRoute: ActivatedRoute,public iab:InAppBrowser,private creditCardService: CreditCardService) { }

  ngOnInit() {
    
    
    

    this.valueS=this.valueS;
    
    this.type=localStorage.getItem("type");
    this.total=localStorage.getItem("totalAmountChoosen");
    this.GroupId=localStorage.getItem("loginuserid");
        if(this.type=="group"){
          this.GetGroupUserModules();
        }
  }
  GetGroupUserModules(){

    var lnk =  'GetGroupUserModules?GroupId='+this.GroupId;


  this.loginService.getData(lnk).then(
    (Response: any) => {
      

      if(Response)
      {
      // this.groupusers=Response;
      this.groupuser_NAMEs=Response;
      

      this.groupusers=Response[0].ModuleList;
      
      // var templs   = [];
      // this.totalAmount=[];
      // this.MULTIlist=[];
      // for(var j=0;j<Response.length;j++)
      // {
      //  this.totalAmount[j] = 0;
      //  this.totalAmountChoosen = 0;
      //  this.MULTIlist[j] = '';
      //   var dynNames = 'USER'+Response[j].User.userId;
      

      //   var totalAmount = 'total'+Response[j].User.userId;
      //   localStorage[dynNames] = JSON.stringify(templs);
      //   localStorage.setItem(totalAmount,'0');
      //   localStorage.setItem("totalAmountChoosen",'0');
      // }
      }else{

      }
    },
    err => {

    }
  );
}

//Group user payment
  purchaseModule(amount,usign,infoM){
    
    console.table(usign);
    
    if (usign.cardholder_name == "" || usign.cardholder_name == undefined){
      this.commonService.presentToast("Enter holder name.");
    }
    else if (usign.ccNumber == "" || usign.ccNumber == undefined){
      this.commonService.presentToast("Enter your credit/debit card number.");
    }

    else if (usign.ccExpMonth == "" || usign.ccExpMonth == undefined){
      this.commonService.presentToast("Enter card expire month.");
    }

    else if(usign.ccExpYear == "" || usign.ccExpYear == undefined) {
      this.commonService.presentToast("Enter card expire year.d");
    }
    else if(usign.ccCvc == "" || usign.ccCvc == undefined) {
      this.commonService.presentToast("Enter card ccv number.");
    }

    else {
      var uid = this.GroupId;
      if(usign.ccExpMonth.toString().length == 1)
      {
        usign.ccExpMonth = '0' + usign.ccExpMonth;
      }
      var joinUser = '';
      var dash = '';
      var joinUserOverList = '';
      var joinUserValuePack = '';
      var joinUserOverallValuePack = '';
      for(var m=0;m<infoM.length;m++)
      {
          var dyncname = 'USER'+infoM[m].User.userId;
          var listMulti = JSON.parse(localStorage.getItem(dyncname));

          if(listMulti.length > 0)
          {
            joinUser = joinUser + infoM[m].User.userId+'-';
            joinUserOverList += infoM[m].User.userId + '-';
            joinUserValuePack += infoM[m].User.userId + '-';
            joinUserOverallValuePack += infoM[m].User.userId + '-';


            for(var n=0;n<listMulti.length;n++)
            {
              if(n == listMulti.length-1)
              {
                joinUser = joinUser + listMulti[n].ModuleType+'|';
                joinUserOverList += listMulti[n].OverId + '|';
                joinUserValuePack += listMulti[n].Valuepack_id + '|';
                joinUserOverallValuePack += listMulti[n].OverallValuePack_id + '|';

              }else
              {
                joinUser = joinUser + listMulti[n].ModuleType + ',';
                joinUserOverList += listMulti[n].OverId + ',';
                joinUserValuePack += listMulti[n].Valuepack_id + ',';
                joinUserOverallValuePack += listMulti[n].OverallValuePack_id + ',';


              }
            }
          }

      }
      var joinUser = joinUser.substring(0, joinUser.length-1);
      joinUserOverList = joinUserOverList.substring(0, joinUserOverList.length-1);
      joinUserValuePack = joinUserValuePack.substring(0, joinUserValuePack.length-1);
      joinUserOverallValuePack = joinUserOverallValuePack.substring(0, joinUserOverallValuePack.length-1);

      var ExpireDate = usign.ccExpMonth+usign.ccExpYear;

      var ExpMonth = usign.ccExpMonth.toString();
      if (ExpMonth.length === 2 && ExpMonth.startsWith('0')) {
          ExpMonth = ExpMonth.substring(1);
      }

      var ExpYear = usign.ccExpYear.toString();
      var data = 'GroupId=' + uid +
      '&SectionList=' + joinUser +
      '&ValueList=' + joinUserValuePack +
      '&OverValueList=' + joinUserOverallValuePack +
      '&OverList=' + joinUserOverList +
      '&Amount=' + amount.toString() +
      '&CardHoldersName=' + usign.cardholder_name +
      '&CreditCardNo=' + usign.ccNumber +
      '&ExpireDate=' + ExpireDate +
      '&ExpMonth=' + ExpMonth +
      '&ExpYear=' + ExpYear +
      '&Cvc=' + usign.ccCvc;

      var datas = ''
      this.loginService.paymentcourse_group(data).then((Response: any) => {

         if(Response.Status == 'Success'){

           this.commonService.closeLoading();
              // this.signupdetails = Response.data[0];

          //  this.commonService.presentToast(Response.Message);
           this.presentAlert("Payment Successful!");
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

  async presentAlert(response) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Payment Successful!',
      message: '<p>'+response+'</p>',
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.modalController.dismiss({
              dismissed: true
            });
            this.router.navigate([`/home/${this.type}`])
            // this.router.navigate([`/home/${this.type}/purchasecourse`])

          //   if(type=="'register'"){
          //   this.router.navigate([`/login/${type}`])
          // }else if(type=="proctorregister"){
          //   this.router.navigate([`/home`])

          // }else if(type=="groupregister"){
          //   this.router.navigate([`/login/group`])

          // }
          }
        }
      ]
    });
    await alert.present();
  }

  async close(){
    await    this.modalController.dismiss();

    }

   getlink (link)
    {
      this.iab.create(link,'_blank')

    }


    //individual user payment home
   singlePurchase(amount,usign,type,section,overid,typeId) {
    if(section){
      this.section=section
    }else{
      this.section=this.sectionId
    }

      if (usign.cardholder_name == "" || usign.cardholder_name == undefined){
        this.commonService.presentToast("Enter holder name.");
      }
      else if (usign.ccNumber == "" || usign.ccNumber == undefined){
        this.commonService.presentToast("Enter your credit/debit card number.");
      }

      else if (usign.ccExpMonth == "" || usign.ccExpMonth == undefined){
        this.commonService.presentToast("Enter card expire month.");
      }

      else if(usign.ccExpYear == "" || usign.ccExpYear == undefined) {
        this.commonService.presentToast("Enter card expire year.d");
      }
      else if(usign.ccCvc == "" || usign.ccCvc == undefined) {
        this.commonService.presentToast("Enter card ccv number.");
      }
     else{
          var uid = localStorage.getItem("Userid");

          var cardBrand = this.creditCardService.identifyCardBrand(this.usign.ccNumber);

        //  const First6 = this.usign.ccNumber.substring(0, 6);
        //  const Last4 = this.usign.ccNumber.substring(this.usign.ccNumber.length - 4);


          // if(usign.ccExpMonth.toString().length == 1)
          // {
          //   usign.ccExpMonth = '0' + usign.ccExpMonth;
          // }

          // var ExpireDate = usign.ccExpMonth+usign.ccExpYear;
          // var data = 'UserId='+uid+'&SectionId='+this.section+'&manstatus=0&videostatus=0&OverId='+overid+'&Type='+typeId+'&PackId=0&Amount='+amount+'&CardHoldersName='+usign.cardholder_name+'&CardBrand='+cardBrand+'&CreditCardNo='+usign.ccNumber+'&ExpireDate='+ExpireDate;
          var ExpMonth = usign.ccExpMonth.toString();
        if (ExpMonth.length === 2 && ExpMonth.startsWith('0')) {
            ExpMonth = ExpMonth.substring(1);
        }

        var ExpYear = usign.ccExpYear.toString();

        var PackValue = this.ValueId ?? "-1";

        var TypeValue = this.nid ?? "-1";

        var OverIdValue = this.OverId ?? "-1";

        var data = 'UserId=' + uid + '&SectionId=' + this.section + '&manstatus=0&videostatus=0&OverId=' + OverIdValue + '&Type=' + TypeValue + '&PackId=' + PackValue + '&Amount=' + amount + '&CardHoldersName=' + usign.cardholder_name + '&CardBrand=' + cardBrand + '&CreditCardNo=' + usign.ccNumber + '&ExpMonth=' + ExpMonth + '&ExpYear=' + ExpYear + '&Cvc=' + usign.ccCvc;
          // var data = 'UserId='+uid+'&SectionId='+this.section+'&manstatus=0&videostatus=0&OverId='+overid+'&Type='+typeId+'&PackId=0&Amount='+amount+'&CardHoldersName='+usign.cardholder_name+'&CardBrand='+cardBrand+'&CreditCardNo='+usign.ccNumber+'&ExpireDate='+ExpireDate+'&First6='+First6+'&Last4='+Last4;

          this.loginService.paymentcourse_single(data).then((Response: any) => {

             if(Response.Status == 'Success'){

               this.commonService.closeLoading();
                  // this.signupdetails = Response.data[0];

              //  this.commonService.presentToast(Response.Message);
               this.presentAlert("Payment Successful!");
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



      //tarining centerpayment
      purchaseModule_trainingcenter(amount,usign,valueid){

        if (usign.cardholder_name == "" || usign.cardholder_name == undefined){
          this.commonService.presentToast("Enter holder name.");
        }
        else if (usign.ccNumber == "" || usign.ccNumber == undefined){
          this.commonService.presentToast("Enter your credit/debit card number.");
        }

        else if (usign.ccExpMonth == "" || usign.ccExpMonth == undefined){
          this.commonService.presentToast("Enter card expire month.");
        }

        else if(usign.ccExpYear == "" || usign.ccExpYear == undefined) {
          this.commonService.presentToast("Enter card expire year.d");
        }
        else if(usign.ccCvc == "" || usign.ccCvc == undefined) {
          this.commonService.presentToast("Enter card ccv number.");
        }

        else {
          var uid = localStorage.getItem("Userid");
          // if(usign.ccExpMonth.toString().length == 1)
          // {
          //   usign.ccExpMonth = '0' + usign.ccExpMonth;
          // }
          var joinUser = '';
          var dash = '';
          var nullP = "-1";

          var joinUser = joinUser.substring(0, joinUser.length-1);

          var ExpireDate = usign.ccExpMonth+usign.ccExpYear;
          var ExpMonth = usign.ccExpMonth.toString();
          if (ExpMonth.length === 2 && ExpMonth.startsWith('0')) {
              ExpMonth = ExpMonth.substring(1);
          }

          var ExpYear = usign.ccExpYear.toString();

          var data =  'UserId='+uid+'&SectionId='+nullP+'&OverId='+nullP+'&Type='+nullP+'&PackId='+valueid+'&Amount='+amount+'&CardHoldersName='+usign.cardholder_name+'&CreditCardNo='+usign.ccNumber+'&ExpireDate='+ExpireDate + '&ExpMonth=' + ExpMonth + '&ExpYear=' + ExpYear + '&Cvc=' + usign.ccCvc;

          this.loginService.paymentcourse_single(data).then((Response: any) => {

             if(Response.Status == 'Success'){

               this.commonService.closeLoading();
                  // this.signupdetails = Response.data[0];

              //  this.commonService.presentToast(Response.Message);
               this.presentAlert("Payment Successful!");
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
