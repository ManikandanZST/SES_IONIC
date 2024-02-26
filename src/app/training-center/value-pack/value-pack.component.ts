import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/providers/login.service';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { PaymentModalComponent } from 'src/app/home/payment-modal/payment-modal.component';

@Component({
  selector: 'app-value-pack',
  templateUrl: './value-pack.component.html',
  styleUrls: ['./value-pack.component.scss'],
})
export class ValuePackComponent implements OnInit {
@Input("subCourse") subCourse
@Input("heading") heading
  courseheading: any={};
  subcourse: any;
  tradehtml: string;
  infoU: any={};
  tr:any=[];

  constructor(public modalctrl:ModalController,public loginService:LoginService,private pdfGenerator: PDFGenerator,) { }

  ngOnInit() {
    console.log(this.subCourse,"subCourse")
    console.log(this.heading,"courseheading")
    this.courseheading=this.heading;
    this.subcourse=this.subCourse;
    this.getuserdetails();
  }
  back(){
    this.modalctrl.dismiss()
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
  async showPayment(id,amt){

   var ValueId =id;
   var ValueAmount=amt;

      const modal = await this.modalctrl.create({
        component: PaymentModalComponent,
        componentProps: {
          "ValueId": ValueId,
          "ValueAmount":ValueAmount
        },
        cssClass: 'my-custom-modal-css',
        swipeToClose: true,
      });
      modal.onDidDismiss().then((result:any) => {

        if (result && result.data && result.data.dismissed) {


          this.back();

        }
      });
      return await modal.present();
  }
  generatepdfALL(valueS,tAmt,pack)
  {

      var timeStamp = Math.floor(Date.now() / 1000);

      for(var i=0;i<valueS.length;i++)
      {
          var trr = '<tr style="border: 1px solid #000;"> <td style="width:5%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;">1</td><td style="width:75%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;">'+valueS[i].sectionName+'</td><td style="width:20%;padding:10px;border-top: 1px solid #000;">$ '+valueS[i].price+'</td></tr>'
          this.tr.push(trr);

      }

      var lnk='GetContent/10';
      this.loginService.getData(lnk).then((response)=>{
        console.log(response.sh_content,"response");
      var address = response.sh_content;
      var time=Date.now();
      const d = new Date(time);

      this.tradehtml = '<html><body style="margin:0 auto;background-color: #fff; padding:20px;font-family: Verdana, Geneva, sans-serif!important;"> <div style="padding:10px 0;margin:0 auto;text-align:center;"> <h2 style="padding:10px 0;margin:0 auto;text-align:center;color:#0a3a4f;">Invoice</span></h2></div><table style="width: 99%"> <tbody> <tr style=""> <td style="width:37%;padding:10px;">'+address+'</td><td style="width:10%;padding:10px;">Invoice No: '+timeStamp+this.infoU.fullName+'</td></tr></tbody> </table> <div style="width: 99%;height: 2px;background: #9e9e9e;margin: 20px 0;"></div><table style="width: 99%"> <tbody> <tr style=""> <td style="width:40%;padding:10px;"> <fieldset style="height:100;"><legend>Customer</legend>Name: '+this.infoU.fullName+' <br>Company: '+this.infoU.company+'<br>Phone: '+this.infoU.phone+'</fieldset></td><td style="width:20%;padding:10px;"></td><td style="width:40%;padding:10px;"> <fieldset style="height:100"> <legend>Misc</legend> Date: '+d+'<br>Order No.: 0<br></fieldset> </td></tr></tbody> </table> <table style="border: 1px solid #000; width: 99%;margin-top: 10px;"> <thead style="background-color: #ccc"> <tr> <th style="width:5%;padding:10px">No</th> <th style="width:75%;padding:10px">Description</th> <th style="width:20%;padding:10px">Price</th> </tr></thead> <tbody> '+this.tr+' <tr style="border: 1px solid #000;"> <td style="width:5%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;"></td><td style="width:75%;padding:10px;border-right: 1px solid #000;border-top: 1px solid #000;text-align: right;"><strong>Total</strong></td><td style="width:20%;padding:10px;border-top: 1px solid #000;">$ '+tAmt+'</td></tr></tbody> </table></body></html>';
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

    //    pdf.htmlToPDF({
    //       data: this.tradehtml,
    //       documentSize: "A4",
    //       landscape: "portrait",
    //       type: "share"
    //   }, this.success, this.failure);
    })
  }
}
