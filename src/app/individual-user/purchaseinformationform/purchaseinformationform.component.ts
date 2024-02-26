import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentModalComponent } from 'src/app/home/payment-modal/payment-modal.component';
import { LoginService } from 'src/providers/login.service';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-purchaseinformationform',
  templateUrl: './purchaseinformationform.component.html',
  styleUrls: ['./purchaseinformationform.component.scss'],
})
export class PurchaseinformationformComponent implements OnInit {
@Input ("sectionlist") sectionlist;
@Input ("sectionId") sectionId;


@Input ("info") info;
valueS:any;

today = Date.now();
  infoU: any={};
  sectionList: any={};
  tr: any[];
  address: any;
  tradehtml: any;
  constructor(public modalCtrl:ModalController,public loginService:LoginService, private pdfGenerator: PDFGenerator) { }

  ngOnInit() {
    console.log('vasanth')
    console.log(this.sectionlist)
    console.log(this.info)
    this.infoU=this.info;
    this.sectionList=this.sectionlist;

}
async nextPurchase(payInfoamount){
  console.log('vasanth2')
  // console.log(this.nid,"nid")
  // var amount=this.amt;
  // var valueS= this.sectionList;
  // var nid=this.nid;
  const modal = await this.modalCtrl.create({
    component: PaymentModalComponent,
    componentProps: {
     "payInfoamount":payInfoamount,
     "sectionId":this.sectionId,
    //  "nid":nid,
    },
    cssClass: 'my-custom-modal-css',
    swipeToClose: true,
  });
  modal.onDidDismiss().then((result:any) => {

    if (result && result.data && result.data.dismissed) {


      this.close();

    }
  });
  return await modal.present();
}
generatepdfALL(valueS,infoU,tAmt)
{
    var valueS= this.sectionList;

    var timeStamp = Math.floor(Date.now() / 1000);
    this.tr =[];

    // for(var i=0;i<valueS.length;i++)
    // {
    //     var trr = '<tr style="border: 1px solid #000;"> <td style="width:5%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;">1</td><td style="width:75%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;">'+valueS[i].sectionName+'</td><td style="width:20%;padding:10px;border-top: 1px solid #000;">$ '+valueS[i].price+'</td></tr>'
    //     console.log("trr - ",trr);
    //     this.tr.push(trr);
    // }

    //#region Create Invoice by saravana

    var trr = '<tr style="border: 1px solid #000;"> <td style="width:5%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;">1</td><td style="width:75%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;">'+valueS.sectionName+'</td><td style="width:20%;padding:10px;border-top: 1px solid #000;">$ '+valueS.price+'</td></tr>';
    this.tr.push(trr);
    console.log("select course", this.tr);

    var lnk='GetContent/10';
    this.loginService.getData(lnk).then(
      (Response: any) => {

        if(Response)
        {
          this.address=Response.sh_content;
          console.log(this.address,"about")
          this.tradehtml = '<html><body style="margin:0 auto;background-color: #fff; padding:20px;font-family: Verdana, Geneva, sans-serif!important;"> <div style="padding:10px 0;margin:0 auto;text-align:center;"> <h2 style="padding:10px 0;margin:0 auto;text-align:center;color:#0a3a4f;">Invoice</span></h2></div><table style="width: 99%"> <tbody> <tr style=""> <td style="width:37%;padding:10px;">'+this.address+'</td><td style="width:10%;padding:10px;">Invoice No: '+timeStamp+infoU.fullName+'</td></tr></tbody> </table> <div style="width: 99%;height: 2px;background: #9e9e9e;margin: 20px 0;"></div><table style="width: 99%"> <tbody> <tr style=""> <td style="width:40%;padding:10px;"> <fieldset style="height:100;"><legend>Customer</legend>Name: '+infoU.fullName+' <br>Company: '+infoU.company+'<br>Phone: '+infoU.phone+'</fieldset></td><td style="width:20%;padding:10px;"></td><td style="width:40%;padding:10px;"> <fieldset style="height:100"> <legend>Misc</legend> Date: '+this.today+'<br>Order No.: 0<br></fieldset> </td></tr></tbody> </table> <table style="border: 1px solid #000; width: 99%;margin-top: 10px;"> <thead style="background-color: #ccc"> <tr> <th style="width:5%;padding:10px">No</th> <th style="width:75%;padding:10px">Description</th> <th style="width:20%;padding:10px">Price</th> </tr></thead> <tbody> '+this.tr+' <tr style="border: 1px solid #000;"> <td style="width:5%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;"></td><td style="width:75%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;text-align: right;"><strong>Total</strong></td><td style="width:20%;padding:10px;border-top: 1px solid #000;">$ '+tAmt+'</td></tr></tbody> </table></body></html>';
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
        }else{

        }
      },
      err => {

      }
    );

    //#endregion


  //   var lnk='https://shawneerct.com/API/action/GetContent/10'
  //   this.loginService.getData(lnk).then(function(response){
  //  this.address = response.data.sh_content;
  //   this.tradehtml = '<html><body style="margin:0 auto;background-color: #fff; padding:20px;font-family: Verdana, Geneva, sans-serif!important;"> <div style="padding:10px 0;margin:0 auto;text-align:center;"> <h2 style="padding:10px 0;margin:0 auto;text-align:center;color:#0a3a4f;">Invoice</span></h2></div><table style="width: 99%"> <tbody> <tr style=""> <td style="width:37%;padding:10px;">'+this.address+'</td><td style="width:10%;padding:10px;">Invoice No: '+timeStamp+infoU.fullName+'</td></tr></tbody> </table> <div style="width: 99%;height: 2px;background: #9e9e9e;margin: 20px 0;"></div><table style="width: 99%"> <tbody> <tr style=""> <td style="width:40%;padding:10px;"> <fieldset style="height:100;"><legend>Customer</legend>Name: '+infoU.fullName+' <br>Company: '+infoU.company+'<br>Phone: '+infoU.phone+'</fieldset></td><td style="width:20%;padding:10px;"></td><td style="width:40%;padding:10px;"> <fieldset style="height:100"> <legend>Misc</legend> Date: '+this.today+'<br>Order No.: 0<br></fieldset> </td></tr></tbody> </table> <table style="border: 1px solid #000; width: 99%;margin-top: 10px;"> <thead style="background-color: #ccc"> <tr> <th style="width:5%;padding:10px">No</th> <th style="width:75%;padding:10px">Description</th> <th style="width:20%;padding:10px">Price</th> </tr></thead> <tbody> '+this.tr+' <tr style="border: 1px solid #000;"> <td style="width:5%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;"></td><td style="width:75%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;text-align: right;"><strong>Total</strong></td><td style="width:20%;padding:10px;border-top: 1px solid #000;">$ '+tAmt+'</td></tr></tbody> </table></body></html>';
  //   console.log(this.tradehtml);

  //   let options = {
  //     documentSize: 'A4',
  //     type: 'share',
  //     // landscape: 'portrait',
  //     fileName: 'Order-Invoice.pdf'
  //   };
  //   this.pdfGenerator.fromData(this.tradehtml, options)
  //     .then((base64) => {
  //       console.log('OK', base64);
  //     }).catch((error) => {
  //       console.log('error', error);
  //     });

  // //    pdf.htmlToPDF({
  // //       data: this.tradehtml,
  // //       documentSize: "A4",
  // //       landscape: "portrait",
  // //       type: "share"
  // //   }, this.success, this.failure);
  // })
}
close(){
  this.modalCtrl.dismiss().then(()=>{
   // window.location.reload();
  });

}
}
