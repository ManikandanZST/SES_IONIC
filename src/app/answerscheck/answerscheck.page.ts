import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';
import { WebService } from '../../providers/web.service';

@Component({
    selector: 'app-answerscheck',
    templateUrl: './answerscheck.page.html',
    styleUrls: ['./answerscheck.page.scss'],
})

export class AnswersCheckPage implements OnInit {

    userid: any;
    sid: any;
    link: any;
    qInfo: any;
    count:any;
    testResult: any;
    infoQue: any;
    correctAnswer: any;
    wrongAnswer: any;
    STime: any;
    ETime: any;
    testID: any;
    d: any;
    type: string;

    constructor(public router:Router, private commonService: CommonService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private webService: WebService) {
        this.activatedRoute.params.subscribe(params => {
            // 
            this.sid=params['sid'];
            
            this.link=params['link'];
            
        });
    }

    ngOnInit() {
        this.testID = localStorage.getItem("testID");
        this.userid = localStorage.getItem("Userid");
        this.getanswersInfo();
        
    }

    getanswersInfo(){
        var sid = this.sid;
        var link = this.link;
        this.qInfo = JSON.parse(localStorage.getItem("qInfo"));
        var l = parseInt(this.qInfo.length);
        this.count = localStorage.getItem("count");
        var c = this.count;
        this.d = c/(l)*100;
        var testResult = parseInt(this.d); //c/(l + 1)*100; // removed parseInt

        
        
        
        

        var id = this.userid;
        var stime = localStorage.getItem("stime");
        var etime = this.dayTime();
        var quesList = localStorage.getItem("quesList");
        this.testResult = testResult;
        this.infoQue = this.qInfo;
        
        this.correctAnswer = c;
        this.wrongAnswer = l - c;
        this.STime = stime;
        this.ETime = etime;
        
        var tid = this.testID;
        //need to call API
        var data = 'userId='+id+'&totalQues='+l+'&crctCount='+c+'&startTime='+stime+'&endTime='+etime+'&sectionid='+sid+'&testId='+tid+'&Questions='+quesList;
        this.webService.answersList(link,data).then((res) => {

            if (res.Status == 'Success') {

            } else {

            }
          }, err => {
            

        });
    }

    dayTime()
    {
        var  conDate = new Date();
        let dd: any;
        dd = conDate.getDate();
        let MM: any;
        MM = conDate.getMonth() + 1;
        var yy = conDate.getFullYear();
        var HH = conDate.getHours();
        var MIN = conDate.getMinutes();
        var SEC = conDate.getSeconds();
        var endmonth = yy+"-"+MM+"-"+dd;
        if(dd<10)
        {
            dd='0'+dd;
        }

        if(MM<10)
        {
            MM='0'+MM;
        }
        var endmonth1 = yy+'-'+MM+'-'+dd+' '+HH+':'+MIN+':'+SEC;
        return endmonth1;
    }

    back(){
        this.type=localStorage.getItem('type');
        
        if(this.type=="individual"){
        this.router.navigate([`/home/${this.type}`])
        }else if(this.type=="group"){
        this.router.navigate([`/home/${this.type}`])

        }else{
        this.router.navigate([`/home/common`])
        }
    }
}
