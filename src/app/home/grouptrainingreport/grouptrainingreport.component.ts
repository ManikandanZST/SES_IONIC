import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserreportgroupComponent } from 'src/app/userreportgroup/userreportgroup.component';
import { LoginService } from 'src/providers/login.service';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';
import { Route, Router } from '@angular/router';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-grouptrainingreport',
  templateUrl: './grouptrainingreport.component.html',
  styleUrls: ['./grouptrainingreport.component.scss'],
})
export class GrouptrainingreportComponent implements OnInit {
  GroupId: string;
  info: any;
  training: any;
  tradehtml: string;
  filterData: any;
  searchTerm: any;
  tr: any[];
  success: any;
  failure: any;
  report: any;
  sample: string;
  type: any;
  search: boolean=false;

  constructor(public loginService:LoginService,public modalCtrl:ModalController,public router:Router,private pdfGenerator: PDFGenerator) { }

  ngOnInit() {
    this.GroupId=localStorage.getItem("loginuserid");
    this.type=localStorage.getItem("type");
    this.GetGroupUser();
    this.GetGroupTraining();
  }
  GetGroupUser(){
    var lnk =  'GetGroupUser?GroupId='+this.GroupId;
    this.loginService.getData(lnk).then(
      (Response: any) => {
        if(Response)
        {
        this.info=Response.UserList;
        }else{

        }
      },
      err => {

      }
    );
  }
  GetGroupTraining(){
    var lnk =  'GroupTrainingReport?GroupId='+this.GroupId;
    this.loginService.getData(lnk).then(
     (Response: any) => {
       if(Response)
       {
       this.training=Response;


       }else{

       }
     },
     err => {

     }
   );
 }

 async showUserReport(lst, index){
  

  this.report = lst[index];
  const modal = await this.modalCtrl.create({
    component: UserreportgroupComponent,
    componentProps: {
      "report": this.report,
    },
    cssClass: 'my-custom-modal-css',
    swipeToClose: true,

  })
  return await modal.present();
 }
 overallReport(overList){
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
    orientation: 'portrait'
  });



        var timeStamp = Math.floor(Date.now() / 1000);
        this.tr =[];
        var trr0 ='';
        var trr1 ='';

        var ProctorId = '';
        var ProctorName = '';
        for(var a=0;a<overList.length;a++)
        {
          var trr3 ='';
          var tpr3 = '';
          var trr5 ='';
          var trr2 ='';
          var overEx ='';
          var overTitle ='';
          if(overList[a].ProctorId == 0){ProctorId = '';
          }else{ProctorId = overList[a].ProctorId;
          }if(overList[a].ProctorName == null){ProctorName = '';
          }else{ProctorName = overList[a].ProctorName;
          }
          for(var e= 0; e< overList[a].Exam.length; e++)
          {
            for(var f= 0; f< overList[a].Exam[e].length; f++)
            {
                if(f == 0) {
                  trr2 = '<tr><td align="left"><b>'+overList[a].Exam[e][f].ModuleName+'</b> </td></tr>';
                }
                  trr2 += '<tr><td width="60%" align="Left" valign="top">'+overList[a].Exam[e][f].SectionName+'</td>';
              }
          }

          if(overList[a].OverAllExam.length > 0){
            for(var e= 0; e< overList[a].OverAllExam.length; e++)
            {
              overTitle = '<tr><td align="left"><b>Over All Exams</b></td></tr>';
              overEx += '<tr><td align="left">'+overList[a].OverAllExam[e]+'</td></tr>';
            }
          }else{
            overTitle = '';
            overEx = '';
          }

          for(var e= 0; e< overList[a].Exam.length; e++)
          {

            for(var f= 0; f< overList[a].Exam[e].length; f++)
            {
                if(f == 0) {
                      trr2 = '<tr><td align="left"><b>'+overList[a].Exam[e][f].ModuleName+'</b> </td></tr>';
                }
                  trr2 += '<tr><td width="60%" align="Left" valign="top">'+overList[a].Exam[e][f].SectionName+'</td>';
              }
          }

          

          trr1='<table width="100%" border="0"> <tbody> <tr> <td width="15%" align="Left"> <b> User ID : </b> </td><td width="75%" align="Left">'+overList[a].UserId+' </td></tr><tr> <td width="15%" align="Left"> <b> User Name : </b> </td><td width="50%" align="Left">'+overList[a].UserName+'</td></tr></tbody> </table> <br><table width="100%" height="322" border="1" align="center" cellpadding="0" cellspacing="0"> <tbody> <tr height="50" bgcolor="#D1E1AF"> <td style="width:60%; color:#244400;"> <table style="color:#244400;" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td width="50%"> &nbsp; <strong>Outstanding Training Courses</strong> </td><td width="25%"><strong>Proctor ID</strong> </td><td width="25%"><strong>Proctor Name</strong></td></tr></tbody> </table> </td><td width="60%" style="color:#244400;"> &nbsp; <b>Completed Training Courses</b></td></tr><tr> <td valign="top" width="40%"> <div align="left"> <table border="0" width="100%" cellspacing="0" cellpadding="4"> <tbody> <tr class="fst"> <td align="Left"><b>Module Name</b></td><td style="width: 95px; height: 21px;" align="center"> '+ProctorId+' </td><td align="center" style="height: 21px">'+ProctorName+' </td></tr>'+trr2+overTitle+overEx+'</table> </div></td>';
          
            for(var e= 0; e< overList[a].SectionList.length; e++)
            {

                for(var f= 0; f< overList[a].SectionList[e].length; f++)
                {
                    if(f == 0)
                    {
                      trr3 = '<tr><td align="left"><b>'+overList[a].SectionList[e][f].ModuleName+'</b> </td></tr>';
                    }
                    trr3 += '<tr><td width="60%" align="Left" valign="top">'+overList[a].SectionList[e][f].SectionName+'</td> <td width="20%" align="Left" valign="top">'+(overList[a].SectionList[e][f].Finished)+'</td><td width="10%" align="Left" valign="top">'+overList[a].SectionList[e][f].Result+'</td><td width="10%" align="Left" valign="top">';
                    if(overList[a].SectionList[e][f].PResult == 'P'){
                      trr3 += 'PASS';
                    }else{
                      trr3 += 'FAIL';
                    }
                     trr3 += '</td></tr>';
                }
                tpr3 += trr3;
            }


            for(var i= 0; i< overList[a].OverAllList.length; i++)
            {
                // var trr5 ='';
                if(i == 0)
                {
                  trr5 += '<tr><td align="left"><b>'+overList[a].OverAllList[i].ModuleName+'</b> </td></tr>';
                }
                trr5 += '<tr><td width="60%" align="Left" valign="top">'+overList[a].OverAllList[i].ModuleName+'</td> <td width="20%" align="Left" valign="top">'+(overList[a].OverAllList[i].Finished)+'</td><td width="10%" align="Left" valign="top">'+overList[a].OverAllList[i].Result+'</td><td width="10%" align="Left" valign="top">';
                if(overList[a].OverAllList[i].PResult == 'P'){
                  trr5 += 'PASS';
                }else{
                  trr5 += 'FAIL';
                }
                trr5 += '</td></tr>';
            }
            trr0 += trr1+'<td width="60%" valign="top"> <table border="0" width="100%" cellpadding="5" cellspacing="0"> <tbody> <tr class="fst"> <td width="50%" align="Left" valign="top"><b>Module Name</b></td><td width="25%" align="Left" valign="top"><b>Finish Date</b></td><td width="15%" align="Left" valign="top"><b>Score</b></td><td width="10%" align="Left" valign="top"><b>Pass/Fail</b></td></tr>'+tpr3+' <tr> <td align="Left" colspan="4"> <b>Over All Exams</b> </td></tr>'+trr5+' <tr> </tbody> </table> </td></tr></tbody> </table>'
        }
        this.tradehtml = '<html><body style="margin:0 auto;background-color: #fff; padding:20px;font-family: Verdana, Geneva, sans-serif!important;"> <div class="cont" id="Print_Content"> <form action="Training_Report.asp" method="post" name="Form1"> <div align="center">Shawnee Environmental Services, Inc. (SES, Inc.) SDVOB <a href="https://www.rentatechs.com/">Rentatechs.com</a> <br><a href="mailto:admin@shawneerct.com/">admin@shawneerct.com/</a> 937-572-9706/ Fax 202-351-0511 <p></p></div><p align="center"><img src="assets/images/Training_Summary.gif" alt="Shwanerrct Logo" width="468" height="60"></p>'+trr0+'</form> </div></body></html>';
        
        //  pdf.htmlToPDF({
        //     data: this.tradehtml,
        //     documentSize: "A4",
        //     landscape: "portrait",
        //     type: "share"
        // }, this.success, this.failure);
  //       const fontInPt = 4 * 2.83465;
  // doc.setFontSize(fontInPt);
  this.sample="<h2> <strong> H2 </strong>Assin </h2>";


  // html2pdf()
  // .from(this.tradehtml)
  // .set({
  //   margin: [25, 15, 15, 15],
  //   filename: 'exportPdf.pdf',
  //   image: { type: 'jpeg', quality: 0.98 },
  //   html2canvas: {
  //     scale: 2,
  //     //   proxy: 'https://devum-client-public-bucket.s3.amazonaws.com/',
  //     logging: true,
  //     //   dpi: 192,
  //     //  letterRendering: true,
  //     // allowTaint: true,
  //     useCORS: true,
  //   },
  //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' },
  //   pagebreak: { mode: 'avoid-all', avoid: 'thead' },
  //   //  pagebreak: { mode: ['avoid-all'], avoid: 'table' },
  // })
  // .toPdf()
  // .get('pdf')
  // .then(function (pdf) {
  //   var totalPages = pdf.internal.getNumberOfPages();

  //   for (let i = 1; i <= totalPages; i++) {
  //     pdf.setPage(i);
  //     pdf.setFontSize(8);
  //     pdf.setTextColor(150);
  //     pdf.text(15, 15, 'Header Content Goes here');
  //     pdf.text(
  //       'Footer Content goes here ' + i + '/' + totalPages + '',
  //       pdf.internal.pageSize.getWidth() - 85,
  //       pdf.internal.pageSize.getHeight() - 8
  //     );
  //   }
  // })
  // .save();

  let options = {
    documentSize: 'A4',
    type: 'share',
    // landscape: 'portrait',
    fileName: 'Order-Invoice.pdf'
  };
  this.pdfGenerator.fromData(this.tradehtml, options)
    .then((base64) => {
      
    }).catch((error) => {
      
    });


}
  async close(){
    this.router.navigate([`home/${this.type}`])
  }

  setFilteredLocations(){
    this.search=true;
    this.filterData = this.training.filter((location) => {
      return location.UserName.indexOf(this.searchTerm) > -1;
    });
  }
  onCancel($event){
    this.search=false;
    this.filterData=this.training
    $event.target.value = '';

  }
}
