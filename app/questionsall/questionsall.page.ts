import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';
import { WebService } from '../../providers/web.service';
import { IonSlides } from '@ionic/angular';

@Component({
    selector: 'app-questionsall',
    templateUrl: './questionsall.page.html',
    styleUrls: ['./questionsall.page.scss'],
})

export class QuestionsAllPage implements OnInit { 
    public options = {
        initialSlide: 0,
        speed: 400
      };
    
    testID: any;
    OverId: any;
    timer: any;
    userid: string;
    ProctQuestions: any;
    questionsOver: any=[];
    cancel: boolean = true;
    currentIndex: any;
    nextbtn: boolean = true;
    sectinoID: any;
    qInfo: any=[];
    count: any;
    quesList: any;    
    isShown: boolean = true;
    @ViewChild('mySlider') slides: IonSlides;

    constructor(public router:Router, private commonService: CommonService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private webService: WebService) {
        this.activatedRoute.params.subscribe(params => {
            // console.log(params['type']);
            this.testID=params['testID'];
            localStorage.setItem("testID",this.testID);
            //console.log("testID",this.testID);
            this.OverId=params['OverId'];
            //console.log("OverId",this.OverId);
            this.timer=params['timer'];            
            //this.timer='01';     //To change timer for testing 
            //console.log("timer",this.timer);
        });
    }

    startTime()
    {
        var  conDate = new Date();
        let dd: any;
        dd  = conDate.getDate();
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
        var endmonth1 = dd+'.'+MM+'.'+yy+' '+HH+':'+MIN+':'+SEC;  
        return endmonth1;
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

    ngOnInit() {
        this.userid = localStorage.getItem("Userid");        
        //console.log("questionsall - userid", this.userid);
        var stime = this.startTime();
        localStorage.setItem("stime",this.dayTime());
        this.GetProctQuestions();
        localStorage.setItem("sectinoID",this.OverId);
        this.sectinoID = localStorage.getItem("sectinoID");        
    }

    GetProctQuestions(){
        this.commonService.presentLoading();
        var stime = localStorage.getItem("stime");
        var lnk =  'GetOverallQuestions/?overid='+this.OverId+'&userId='+this.userid+'&starttime='+stime;
        this.webService.GetProctQuestions(lnk).then(
            (Response: any) => {                              
                this.commonService.closeLoading();  
                this.ProctQuestions = Response;  
                this.ProctQuestions.forEach((value, key) => {
                    this.questionsOver[key] = value;
                });
                // var element, endTime, hours, mins, msLeft, time, seconds=0;
                // element = document.getElementById( "countdown2" );
                // endTime = (+new Date) + 1000 * (60*this.timer + seconds) + 500;
                // console.log("endTime",endTime);

                var element, endTime, hours, mins, msLeft, time, seconds=0;
          
                function updateTimer()
                {
                    msLeft = endTime - (+new Date);
                    if ( msLeft < 1000 ) {
                        //showSlide = false;
                        element.innerHTML = "Time over!";
                        const box = document.querySelector<HTMLElement>(".questionlist");
                        box.style.visibility = 'hidden';
                        const boxbutton =  document.querySelector<HTMLElement>(".btn-flx");
                        boxbutton.style.visibility = 'hidden';
                        const timeover = document.querySelector<HTMLElement>(".over");
                        timeover.style.visibility = 'inherit';
                        //this.isShown = false;
                    } else {
                        function twoDigits( n )
                        {
                            return (n <= 9 ? "0" + n : n);
                        }
                        //showSlide = true;
                        // const box = document.querySelector<HTMLElement>(".questionlist");
                        // box.style.visibility = 'hidden';
                        //this.isShown = true;
                        time = new Date( msLeft );
                        hours = time.getUTCHours();
                        mins = time.getUTCMinutes();
                        element.innerHTML = 'Time ' +(hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
                        setTimeout(() => { 
                            updateTimer()
                        }, time.getUTCMilliseconds() + 500 );
                    }
                    //$scope.showSlide.div = showSlide;

                }

                element = document.getElementById( "countdown2" );
                endTime = (+new Date) + 1000 * (60*this.timer + seconds) + 500;
                updateTimer();               

                //console.log("procQues",this.ProctQuestions);            
            },
            err => {
                this.commonService.closeLoading();
                this.commonService.presentToast(`Connection error`);                
            }
        );
    }

    next(){
        //console.log("next",this.slides);
        this.slides.slideNext();

        this.slides.getActiveIndex().then(index => {
            //console.log("slider index",index);
            if(index == 0 || index == undefined){
                this.cancel = true;    
            }
            else if ((index+1) == this.questionsOver.length){
                this.nextbtn = false;    
            }else{
                //console.log("Next cancel true");
                this.cancel = false;    
            }

        });
    }

    prev(){
        this.slides.slidePrev();
        this.slides.getActiveIndex().then(index => {
            //console.log("slider index",index);
            if(index == 0){
                this.cancel = true;    
            }
            else if ((index+1) != this.questionsOver.length){
                this.nextbtn = true;    
            }
        });
    }
    
    close(){
        this.router.navigate([`/trainingcenter/`])  
    }

    answerCheckALL(questionsOver,sectinoID){
        //console.log("questionsOver",questionsOver);
        //console.log("sectinoID",sectinoID);
        this.qInfo = questionsOver;
        //console.log("questions all - qInfo",this.qInfo);
        localStorage.setItem("qInfo",JSON.stringify(this.qInfo));
        // var temp = JSON.parse(localStorage.getItem("qInfo"));
        // console.log("question all - temp",temp)
        this.count = 0;
        var qList = '';
        var comma = ',';
        var pipe = '|';
        for(var i =0;i<this.qInfo.length;i++){
            var c = this.qInfo[i].correct;
            var Qs = this.qInfo[i].QSelected;
            var Qid = this.qInfo[i].qId;
            if(this.qInfo.length == i+1){
                var comma = '';
            }
            if(Qs == null || Qs == false){
                Qs = 0
            }
            var qList = qList + Qid +pipe+ Qs+comma;
            this.quesList = qList;
            localStorage.setItem("quesList",this.quesList);
            if(Qs == c){
                this.count = this.count+1;
                //this.count = this.count;
                localStorage.setItem("count",this.count);
            }
        }        
        this.router.navigate([`/answerscheck/${sectinoID}/${"CompleteOverallExam"}`]);
    }
}
