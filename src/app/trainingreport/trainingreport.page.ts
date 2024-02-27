import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';
import { WebService } from '../../providers/web.service';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-trainingreport',
  templateUrl: './trainingreport.page.html',
  styleUrls: ['./trainingreport.page.scss'],
})

export class TrainingReportPage implements OnInit {

    IndividualId: string;
    type: any;
    info: any={};
    name: any;
    FullName: any;
    Email: any;
    lastname: any;
    Phone: any;
    Company_Name: any;
    Ein: any;
    Hint_Answer: any;
    Hint_Question: any;
    SSN: any;
    userId: any;
    proctorId: any;
    trainingreportinfo: any={};
    proctorName: any;
    ishidden = false;
    overallhidden = false;
    completedcoursehidden=-1;
    radworkerhidden=-1;
    purchasedhidden = false;
    tr =[];
    tradehtml: any;

    constructor(public router:Router, private commonService: CommonService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private webService: WebService, private pdfGenerator: PDFGenerator) {

    }

    ngOnInit() {
        this.IndividualId=localStorage.getItem("Userid");
        this.type=localStorage.getItem('type');
        this.GetUser();
        this.GetTrainingReport();
    }

    GetUser(){
        var lnk =  'GetUser/'+this.IndividualId;
        this.loginService.getData(lnk).then(
            (Response: any) => {
              

              if(this.type=="individual")
              {
                
                this.info=Response;
                this.userId=this.info.userId;
                this.FullName=this.info.fullName;
                this.Email=this.info.email;
                this.Phone=this.info.phone;
                this.Company_Name=this.info.company;
                this.SSN=this.info.SSN;
                this.Ein=this.info.EIN;
                this.Hint_Answer=this.info.answer;
                this.Hint_Question=this.info.question;
                this.proctorId=this.info.proctor;
              }else{
                
                this.info=Response.Group;
                this.userId = this.info.userId;
                this.FullName=this.info.First_Name + this.info.Last_Name;
                this.Email=this.info.Email;
                this.Phone=this.info.Phone;
                this.Company_Name=this.info.Company_Name;
                this.Ein=this.info.EIN;
                this.Hint_Answer=this.info.Hint_Answer;
                this.Hint_Question=this.info.Hint_Question;
              }
            },
            err => {

            }
        );
    }

    GetTrainingReport(){
        var lnk =  'TrainingReport/?UserId='+this.IndividualId;
        this.webService.getTrainingReportData(lnk).then(
            (Response: any) => {
              this.trainingreportinfo = Response;
              this.proctorName = this.trainingreportinfo.ProctorName;
            },
            err => {

            }
        );
    }

    toggle(){
        if(this.ishidden == false){
          this.ishidden = true;
        }
        else{
          this.ishidden = false;
        }
    }

    toggle_overall(){
      if(this.overallhidden == false){
        this.overallhidden = true;
      }
      else{
        this.overallhidden = false;
      }
    }

    toggle_section(s){
      if(this.completedcoursehidden == -1){
        this.completedcoursehidden = s;
      }
      else{
        this.completedcoursehidden = -1;
      }
    }

    toggle_radworker(s){
      if(this.radworkerhidden == -1){
        this.radworkerhidden = s;
      }
      else{
        this.radworkerhidden = -1;
      }
    }

    toggle_purchased(){
      if(this.purchasedhidden == false){
        this.purchasedhidden = true;
      }
      else{
        this.purchasedhidden = false;
      }
    }

    generateTrainingReport(s){
      
      var timeStamp = Math.floor(Date.now() / 1000);
      var trr1 ='';
      var trr2 ='';
      var trr3 ='';
      var tpr3 ='';
      var trr4 ='';
      var trr5 ='';

      if(s.Exam)
      {
        for(var b= 0; b< s.Exam.length; b++)
        {
          for(var c= 0; c< s.Exam[b].length; c++)
          {
              if(c == 0)
              {
                trr1 += '<tr><td align="left"><b>'+s.Exam[b][c].ModuleName+'</b> </td></tr>';
              }
              trr1 += '<tr><td align="left">'+s.Exam[b][c].SectionName+' </td></tr>';
          }
        }
      }else{
        trr1 = '';
      }

      if(s.OverAllExam)
      {
        for(var d= 0; d< s.OverAllExam.length; d++){
          trr2 ='<tr><td align="left"><b>'+s.OverAllExam[d]+'</b></td></tr>';
        }
      }else{
          trr2 ='';
      }

      if(s.SectionList)
      {
        for(var e= 0; e< s.SectionList.length; e++){
          for(var f= 0; f< s.SectionList[e].length; f++)
          {
            if(f == 0)
            {
              trr3 = '<tr><td align="left"><b>'+s.SectionList[e][f].ModuleName+'</b> </td></tr>';
            }
            trr3 += '<tr><td width="60%" align="Left" valign="top">'+s.SectionList[e][f].SectionName+'</td> <td width="20%" align="Left" valign="top">'+this.formatAMPM(s.SectionList[e][f].Finished)+'</td><td width="10%" align="Left" valign="top">'+s.SectionList[e][f].Result+'</td><td width="10%" align="Left" valign="top">';
            if(s.SectionList[e][f].PResult == 'P'){
              trr3 += 'PASS';
            }else{
              trr3 += 'FAIL';
            }
              trr3 += '</td></tr>';
          }
          tpr3 += trr3;
        }
      }else{
              tpr3 = '';
      }

      if(s.RadWokerList)
      {
        for(var g= 0; g< s.RadWokerList.length; g++){
          for(var h= 0; h< s.RadWokerList[g].length; h++)
          {
            if(h == 0)
            {
              trr4 += '<tr><td align="left"><b>'+s.RadWokerList[g][h].ModuleName+'</b> </td></tr>';
            }
            trr4 += '<tr><td width="60%" align="Left" valign="top">'+s.RadWokerList[g][h].SectionName+'</td> <td width="20%" align="Left" valign="top">'+this.formatAMPM(s.RadWokerList[g][h].Finished)+'</td><td width="10%" align="Left" valign="top">'+s.RadWokerList[g][h].Result+'</td><td width="10%" align="Left" valign="top">';
            if(s.RadWokerList[g][h].PResult == 'P'){
              trr4 += 'PASS';
            }else{
              trr4 += 'FAIL';
            }
            trr4 += '</td></tr>';
          }
        }
      }else{
        trr4 ='';
      }

      if(s.OverAllList)
      {
        for(var i= 0; i< s.OverAllList.length; i++)
        {
          if(i == 0){
            trr5 += '<tr><td align="left"><b>'+s.OverAllList[i].ModuleName+'</b> </td></tr>';
          }
          trr5 += '<tr><td width="60%" align="Left" valign="top">'+s.OverAllList[i].ModuleName+'</td> <td width="20%" align="Left" valign="top">'+this.formatAMPM(s.OverAllList[i].Finished)+'</td><td width="10%" align="Left" valign="top">'+s.OverAllList[i].Result+'</td><td width="10%" align="Left" valign="top">';
          if(s.OverAllList[i].PResult == 'P'){
            trr5 += 'PASS';
          }else{
            trr5 += 'FAIL';
          }
          trr5 += '</td></tr>';
        }
      }else{
        trr5 = '';
      }

      this.tradehtml = '<html><body style="margin:0 auto;background-color: #fff; padding:20px;font-family: Verdana, Geneva, sans-serif!important;"> <div class="cont" id="Print_Content"><form action="Training_Report.asp" method="post" name="Form1"> <div align="center">Shawnee Environmental Services, Inc. (SES, Inc.) SDVOB <a href="https://www.rentatechs.com/">Rentatechs.com</a><br><a href="mailto:admin@shawneerct.com/">admin@shawneerct.com/</a> 937-572-9706/ Fax 202-351-0511 <p></p></div><p align="center"><img src="https://shawneerct.com/images/Training_Summary.gif" alt="Shwanerrct Logo" width="468" height="60"></p><table width="100%" border="0"> <tbody><tr> <td width="15%" align="Left"> <b> User ID : </b> </td><td width="75%" align="Left">'+s.UserId+' </td></tr><tr><td width="15%" align="Left"> <b> User Name : </b> </td><td width="50%" align="Left">'+s.UserName+'</td></tr></tbody></table> <br><table width="100%" height="322" border="1" align="center" cellpadding="0" cellspacing="0"> <tbody><tr height="50" bgcolor="#D1E1AF"> <td style="width:60%; color:#244400;"> <table style="color:#244400;" cellpadding="0" cellspacing="0" width="100%"> <tbody><tr> <td width="50%"> &nbsp; <strong>Outstanding Training Courses</strong> </td><td width="25%"><strong>Proctor ID</strong> </td><td width="25%"><strong>Proctor Name</strong></td></tr></tbody></table> </td><td width="60%" style="color:#244400;"> &nbsp; <b>Completed Training Courses</b></td></tr><tr> <td valign="top" width="40%"> <div align="left"> <table border="0" width="100%" cellspacing="0" cellpadding="4"> <tbody><tr class="fst"> <td align="Left"><b>Module Name</b></td><td style="width: 95px; height: 21px;" align="center"> '+s.ProctorId+' </td><td align="center" style="height: 21px">'+s.ProctorName+' </td></tr>'+trr1+' <tr> <td align="Left"> <b>Over All Exams</b> </td></tr>'+trr2+' </tbody></table> </div></td><td width="60%" valign="top"> <table border="0" width="100%" cellpadding="5" cellspacing="0"> <tbody><tr class="fst"> <td width="50%" align="Left" valign="top"><b>Module Name</b></td><td width="25%" align="Left" valign="top"><b>Finish Date</b></td><td width="15%" align="Left" valign="top"><b>Score</b></td><td width="10%" align="Left" valign="top"><b>Pass/Fail</b></td></tr>'+tpr3+' '+trr4+'<!-- <td width="100"><table border="1" width="100" align="center"> <tr valign="top" > <td align="left" valign="top"> </td><td width="54"> finished</td><td width="40"> Score </td></tr></table> </td>--> <tr> <td align="Left" colspan="4"> <b>Over All Exams</b> </td></tr>'+trr5+' <tr> </tbody></table></td></tr></tbody></table> </form> </div></body></html>';
      

      let options = {
        documentSize: 'A4',
        type: 'share',
        // landscape: 'portrait',
        fileName: 'Training-Report.pdf'
      };
      this.pdfGenerator.fromData(this.tradehtml, options)
        .then((base64) => {
          
        }).catch((error) => {
          
        });


    }

    formatAMPM(date) {
      var dt = new Date(date).toLocaleDateString();

      var hours1 = date[11];
      var hours2 = date[12];
      var hours = hours1.concat("",hours2);

      var minutes1 = date[14];
      var minutes2 = date[15];
      var minutes = minutes1.concat("",minutes2);

      var ampm = hours >= 12 ? 'pm' : 'am';

      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = dt + ' ' + hours + ':' + minutes + ' ' + ampm;

      return strTime;
    }
}
