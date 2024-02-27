import { Component, Input, OnInit } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ModalController } from '@ionic/angular';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-userreportgroup',
  templateUrl: './userreportgroup.component.html',
  styleUrls: ['./userreportgroup.component.scss'],
})
export class UserreportgroupComponent implements OnInit {
@Input("report") report;
  tradehtml: string;
  status:boolean=false;
  tr: any[];
  constructor(public modalctrl:ModalController,private pdfGenerator: PDFGenerator) { }

  ngOnInit() {
    
  }
  close(){
    this.modalctrl.dismiss();
  }
  generateTrainingReport(report){
    

        var timeStamp = Math.floor(Date.now() / 1000);
        this.tr =[];
        var trr3 ='';
        var tpr3 ='';
        var trr5 ='';

              for(var e= 0; e< report.SectionList.length; e++)
              {

                  for(var f= 0; f< report.SectionList[e].length; f++)
                  {
                      if(f == 0)
                      {
                        trr3 = '<tr><td align="left"><b>'+report.SectionList[e][f].ModuleName+'</b> </td></tr>';
                      }
                      trr3 += '<tr><td width="60%" align="Left" valign="top">'+report.SectionList[e][f].SectionName+'</td> <td width="20%" align="Left" valign="top">'+(report.SectionList[e][f].Finished)+'</td><td width="10%" align="Left" valign="top">'+report.SectionList[e][f].Result+'</td><td width="10%" align="Left" valign="top">';
                      if(report.SectionList[e][f].PResult == 'P'){
                        trr3 += 'PASS';
                      }else{
                        trr3 += 'FAIL';
                      }
                       trr3 += '</td></tr>';
                  }
                  tpr3 += trr3;
              }


              for(var i= 0; i< report.OverAllList.length; i++)
                  {

                      if(i == 0)
                      {
                        trr5 += '<tr><td align="left"><b>'+report.OverAllList[i].ModuleName+'</b> </td></tr>';
                      }
                      trr5 += '<tr><td width="60%" align="Left" valign="top">'+report.OverAllList[i].ModuleName+'</td> <td width="20%" align="Left" valign="top">'+(report.OverAllList[i].Finished)+'</td><td width="10%" align="Left" valign="top">'+report.OverAllList[i].Result+'</td><td width="10%" align="Left" valign="top">';
                      if(report.OverAllList[i].PResult == 'P'){
                        trr5 += 'PASS';
                      }else{
                        trr5 += 'FAIL';
                      }
                      trr5 += '</td></tr>';
                  }


        this.tradehtml = '<html><body style="margin:0 auto;background-color: #fff; padding:20px;font-family: Verdana, Geneva, sans-serif!important;"> <div class="cont" id="Print_Content"> <form action="Training_Report.asp" method="post" name="Form1"> <div align="center">Shawnee Environmental Services, Inc. (SES, Inc.) SDVOB <a href="https://www.rentatechs.com/">Rentatechs.com</a> <br><a href="mailto:admin@shawneerct.com/">admin@shawneerct.com/</a> 937-572-9706/ Fax 202-351-0511 <p></p></div><p align="center"><img src="https://shawneerct.com/images/Training_Summary.gif" alt="Shwanerrct Logo" width="468" height="60"></p><table width="100%" border="0"> <tbody> <tr> <td width="15%" align="Left"> <b> User ID : </b> </td><td width="75%" align="Left">'+report.UserId+' </td></tr><tr> <td width="15%" align="Left"> <b> User Name : </b> </td><td width="50%" align="Left">'+report.UserName+'</td></tr></tbody> </table> <br><table width="100%" height="322" border="1" align="center" cellpadding="0" cellspacing="0"> <tbody> <tr height="50" bgcolor="#D1E1AF"> <td style="width:60%; color:#244400;"> <table style="color:#244400;" cellpadding="0" cellspacing="0" width="100%"> <tbody> <tr> <td width="50%"> &nbsp; <strong>Outstanding Training Courses</strong> </td><td width="25%"><strong>Proctor ID</strong> </td><td width="25%"><strong>Proctor Name</strong></td></tr></tbody> </table> </td><td width="60%" style="color:#244400;"> &nbsp; <b>Completed Training Courses</b></td></tr><tr> <td valign="top" width="40%"> <div align="left"> <table border="0" width="100%" cellspacing="0" cellpadding="4"> <tbody> <tr class="fst"><td align="Left"><b>Module Name</b></td><td style="width: 95px; height: 21px;" align="center"> '+report.ProctorId+' </td><td align="center" style="height: 21px">'+report.ProctorName+' </td></tr></table> </div></td><td width="60%" valign="top"> <table border="0" width="100%" cellpadding="5" cellspacing="0"> <tbody> <tr class="fst"> <td width="50%" align="Left" valign="top"><b>Module Name</b></td><td width="25%" align="Left" valign="top"><b>Finish Date</b></td><td width="15%" align="Left" valign="top"><b>Score</b></td><td width="10%" align="Left" valign="top"><b>Pass/Fail</b></td></tr>'+tpr3+' <tr> <td align="Left" colspan="4"> <b>Over All Exams</b> </td></tr>'+trr5+' <tr> </tbody> </table> </td></tr></tbody> </table> </form> </div></body></html>';
        
        //  pdf.htmlToPDF({
        //     data: this.tradehtml,
        //     documentSize: "A4",
        //     landscape: "portrait",
        //     type: "share"
        // }, this.success, this.failure);

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

  }
