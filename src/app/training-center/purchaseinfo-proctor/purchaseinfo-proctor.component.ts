import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentModalComponent } from 'src/app/home/payment-modal/payment-modal.component';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-purchaseinfo-proctor',
  templateUrl: './purchaseinfo-proctor.component.html',
  styleUrls: ['./purchaseinfo-proctor.component.scss'],
})
export class PurchaseinfoProctorComponent implements OnInit {
  @Input ("titleCourse") titleCourse;
  @Input ("coursePrice") coursePrice;
  @Input ("OverId") OverId;
  
  
  @Input ("info") info;
  today = Date.now();
    infoU: any={};
    sectionList: any={};
    tr: any[];
  address: any;
  tradehtml: string;
    constructor(public modalCtrl:ModalController,public loginService:LoginService,private pdfGenerator: PDFGenerator,private commonService: CommonService) { }
  
    ngOnInit() {
      console.log(this.coursePrice)
      console.log(this.titleCourse)
      console.log(`OverId: ${this.OverId}`)
      this.getuserdetails()
  
  }

  getuserdetails(){
    var id =localStorage.getItem('Userid');
    var userType = localStorage.getItem('type'); 
    if(userType == 'group')
      {
          var lnk =  'GetGroupUser?GroupId='+id;

      }else
      {
          var lnk =  'GetUser/'+id;
      } 
      this.loginService.getData(lnk).then(
        (Response: any) => {
    
          if(Response)
          {
            this.infoU=Response;
            // this.modulelist.sectionlist=this.sectionlist;
            console.log(this.infoU,"infoU")
          }else{
           
          }
        },
        err => {
       
        }
      );
  }
  async nextPurchase(payInfoamount){
    if(this.coursePrice === undefined || this.coursePrice === 0)
    {    
      this.commonService.presentToast("You cannot pay this course.");
    }else{
    console.log(this.coursePrice,":this.coursePrice")
    // var amount=this.amt;
    // var valueS= this.sectionList;
    // var nid=this.nid;
    const modal = await this.modalCtrl.create({
      component: PaymentModalComponent,
      componentProps: { 
       "coursePrice":this.coursePrice,
       "OverId": this.OverId
      //  "sectionId":this.sectionId,
      //  "nid":nid,
      },
      cssClass: 'my-custom-modal-css',
      swipeToClose: true,
    });
    modal.onDidDismiss().then((result) => {
   
     })
    return await modal.present();
    }
  }
  generatepdf(titleCourse,coursePrice,infoU)
  {
      var timeStamp = Math.floor(Date.now() / 1000);
   
      var lnk='GetContent/10'
      this.loginService.getData(lnk).then((response)=>{
     this.address = response.sh_content;
     let dateTime = new Date()
     console.log(dateTime,"dateTime")

      this.tradehtml ='<html><body style="margin:0 auto;background-color: #fff; padding:20px;font-family: Verdana, Geneva, sans-serif!important;"> <div style="padding:10px 0;margin:0 auto;text-align:center;"> <h2 style="padding:10px 0;margin:0 auto;text-align:center;color:#0a3a4f;">Invoice</span></h2></div><table style="width: 99%"> <tbody> <tr style=""><td style="width:37%;padding:10px;">'+this.address+'</td><td style="width:10%;padding:10px;">Invoice No: '+timeStamp+infoU.fullName+'</td></tr></tbody> </table> <div style="width: 99%;height: 2px;background: #9e9e9e;margin: 20px 0;"></div><table style="width: 99%"> <tbody> <tr style=""> <td style="width:40%;padding:10px;"> <fieldset style="height:100;"><legend>Customer</legend>Name: '+infoU.fullName+' <br>Company: '+infoU.company+'<br>Phone: '+infoU.phone+'</fieldset></td><td style="width:20%;padding:10px;"></td><td style="width:40%;padding:10px;"> <fieldset style="height:100"> <legend>Misc</legend> Date: '+dateTime+'<br>Order No.: 0<br></fieldset> </td></tr></tbody> </table> <table style="border: 1px solid #000; width: 99%;margin-top: 10px;"> <thead style="background-color: #ccc"> <tr> <th style="width:5%;padding:10px">No</th> <th style="width:75%;padding:10px">Description</th> <th style="width:20%;padding:10px">Price</th> </tr></thead> <tbody> <tr style="border: 1px solid #000;"> <td style="width:5%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;">1</td><td style="width:75%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;">'+titleCourse+'</td><td style="width:20%;padding:10px;border-top: 1px solid #000;">$ '+coursePrice+'</td></tr><tr style="border: 1px solid #000;"> <td style="width:5%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;"></td><td style="width:75%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;text-align: right;"><strong>Total</strong></td><td style="width:20%;padding:10px;border-top: 1px solid #000;">$ '+coursePrice+'</td></tr></tbody> </table></body></html>';  
      console.log(this.tradehtml);
  
      let options = {
        documentSize: 'A4',
        type: 'share',
        // landscape: 'portrait',
        fileName: 'Order-Invoice.pdf'
      };
      this.pdfGenerator.fromData(this.tradehtml, options)
        .then((base64) => {
          console.log('OK', base64);
        }).catch((error) => {
          console.log('error', error);
        });
  
    
    })
  }



  close(){
    this.modalCtrl.dismiss().then(()=>{
      window.location.reload();
    });
  
  }
}
