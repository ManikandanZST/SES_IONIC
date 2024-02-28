import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CreditCardService } from 'src/providers/creditCard.service';
import { WebService } from 'src/providers/web.service';


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

  processing: boolean = false;


  constructor(private loginService: LoginService, public modalController: ModalController,private webService:WebService,
    private commonService:CommonService,private router: Router,public alertController: AlertController,
       private activatedRoute: ActivatedRoute,public iab:InAppBrowser,private creditCardService: CreditCardService) {

       }
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
      this.groupuser_NAMEs=Response;
      this.groupusers=Response[0].ModuleList;
      }else{
      }
    },
    err => {
    }
  );
}
  purchaseModule(amount,usign,infoM){
    this.processing = true;
    console.table(usign);
    if (usign.cardholder_name == "" || usign.cardholder_name == undefined){
      this.commonService.presentToast("Enter card holder name.");
      this.processing = false;
    }
    else if (usign.ccNumber == "" || usign.ccNumber == undefined){
      this.commonService.presentToast("Enter your credit/debit card number.");
      this.processing = false;
    }
    else if (usign.ccExpMonth == "" || usign.ccExpMonth == undefined){
      this.commonService.presentToast("Enter card expire month.");
      this.processing = false;
    }
    else if(usign.ccExpYear == "" || usign.ccExpYear == undefined) {
      this.commonService.presentToast("Enter card expire year.d");
      this.processing = false;
    }
    else if(usign.ccCvc == "" || usign.ccCvc == undefined) {
      this.commonService.presentToast("Enter card ccv number.");
      this.processing = false;
    }
    else {

            let pay = {
        creditCardNo: parseInt(usign.ccNumber),
        expMonth: parseInt(usign.ccExpMonth),
        expYear: parseInt(usign.ccExpYear),
        cvc: parseInt(usign.ccCvc),
      }
      this.webService.tokenizeCard(pay).then((res:any) => {
                if(res.status){


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
           this.presentAlert("Payment Successful!");
           this.processing = false;
         }else{
          this.commonService.presentToast(Response.Message);
           this.commonService.closeLoading();
           this.processing = false;
         }
       },
       err => {
         this.commonService.closeLoading();
         this.commonService.presentToast(`Connection error`);
         this.processing = false;
       }
     );


  }else{
    this.commonService.presentToast(res.message);
    this.processing = false;
   }
    }, err => {
  });


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
   singlePurchase(amount,usign,type,section,overid,typeId) {
    this.processing = true;
        if(section){
      this.section=section
    }else{
      this.section=this.sectionId
    }
      if (usign.cardholder_name == "" || usign.cardholder_name == undefined){
        this.commonService.presentToast("Enter card holder name.");
        this.processing = false;
      }
      else if (usign.ccNumber == "" || usign.ccNumber == undefined){
        this.commonService.presentToast("Enter your credit/debit card number.");
        this.processing = false;
      }
      else if (usign.ccExpMonth == "" || usign.ccExpMonth == undefined){
        this.commonService.presentToast("Enter card expire month.");
        this.processing = false;
      }
      else if(usign.ccExpYear == "" || usign.ccExpYear == undefined) {
        this.commonService.presentToast("Enter card expire year.d");
        this.processing = false;
      }
      else if(usign.ccCvc == "" || usign.ccCvc == undefined) {
        this.commonService.presentToast("Enter card ccv number.");
        this.processing = false;
      }
     else{
            let pay = {
        creditCardNo: parseInt(usign.ccNumber),
        expMonth: parseInt(usign.ccExpMonth),
        expYear: parseInt(usign.ccExpYear),
        cvc: parseInt(usign.ccCvc),
      }
      this.webService.tokenizeCard(pay).then((res:any) => {
                if(res.status){
          var uid = localStorage.getItem("Userid");
          var cardBrand = this.creditCardService.identifyCardBrand(this.usign.ccNumber);
          var ExpMonth = usign.ccExpMonth.toString();
        if (ExpMonth.length === 2 && ExpMonth.startsWith('0')) {
            ExpMonth = ExpMonth.substring(1);
        }
        var ExpYear = usign.ccExpYear.toString();
        var PackValue = this.ValueId ?? "-1";
        var TypeValue = this.nid ?? "-1";
        var OverIdValue = this.OverId ?? "-1";
        var data = 'UserId=' + uid + '&SectionId=' + this.section + '&manstatus=0&videostatus=0&OverId=' + OverIdValue + '&Type=' + TypeValue + '&PackId=' + PackValue + '&Amount=' + amount + '&CardHoldersName=' + usign.cardholder_name + '&CardBrand=' + cardBrand + '&CreditCardNo=' + usign.ccNumber + '&ExpMonth=' + ExpMonth + '&ExpYear=' + ExpYear + '&Cvc=' + usign.ccCvc;
          this.loginService.paymentcourse_single(data).then((Response: any) => {
             if(Response.Status == 'Success'){
               this.commonService.closeLoading();
                          this.presentAlert("Payment Successful!");
                          this.processing = false;
             }else{
              this.commonService.presentToast(Response.Message);
               this.commonService.closeLoading();
               this.processing = false;
             }
           },
           err => {
             this.commonService.closeLoading();
             this.commonService.presentToast(`Connection error`);
             this.processing = false;
           }
         );


        }else{
          this.commonService.presentToast(res.message);
          this.processing = false;
         }
          }, err => {
            this.processing = false;
        });
        }
      }
      purchaseModule_trainingcenter(amount,usign,valueid){
        this.processing = true;
        if (usign.cardholder_name == "" || usign.cardholder_name == undefined){
          this.commonService.presentToast("Enter card holder name.");
          this.processing = false;
        }
        else if (usign.ccNumber == "" || usign.ccNumber == undefined){
          this.commonService.presentToast("Enter your credit/debit card number.");
          this.processing = false;
        }
        else if (usign.ccExpMonth == "" || usign.ccExpMonth == undefined){
          this.commonService.presentToast("Enter card expire month.");
          this.processing = false;
        }
        else if(usign.ccExpYear == "" || usign.ccExpYear == undefined) {
          this.commonService.presentToast("Enter card expire year.d");
          this.processing = false;
        }
        else if(usign.ccCvc == "" || usign.ccCvc == undefined) {
          this.commonService.presentToast("Enter card ccv number.");
          this.processing = false;
        }
        else {

          let pay = {
            creditCardNo: parseInt(usign.ccNumber),
            expMonth: parseInt(usign.ccExpMonth),
            expYear: parseInt(usign.ccExpYear),
            cvc: parseInt(usign.ccCvc),
          }
          this.webService.tokenizeCard(pay).then((res:any) => {

            if(res.status){

          var uid = localStorage.getItem("Userid");
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
               this.presentAlert("Payment Successful!");
               this.processing = false;
             }else{
              this.commonService.presentToast(Response.Message);
               this.commonService.closeLoading();
               this.processing = false;
             }
           },
           err => {
             this.commonService.closeLoading();
             this.commonService.presentToast(`Connection error`);
             this.processing = false;
           }
         );

        }else{
          this.commonService.presentToast(res.message);
          this.processing = false;
         }
          }, err => {
            this.processing = false;
        });
        }
      }


      validateNumberInput() {

        setTimeout(() => {
          this.usign.ccNumber = this.usign.ccNumber.replace(/[^0-9]/g, '');

        }, 300);

      }

      validateExpYearInput() {

        setTimeout(() => {


          this.usign.ccExpYear= this.usign.ccExpYear.replace(/[^0-9]/g, '');

        }, 300);

      }
      validateExpMonthInput() {

        setTimeout(() => {

          this.usign.ccExpMonth= this.usign.ccExpMonth.replace(/[^0-9]/g, '');

        }, 300);

      }
      validateCvcInput() {

        setTimeout(() => {

          this.usign.ccCvc= this.usign.ccCvc.replace(/[^0-9]/g, '');
        }, 300);

      }
    }
