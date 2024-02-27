import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';
import { WebService } from '../../providers/web.service';
import { IonSlides } from '@ionic/angular';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.page.html',
    styleUrls: ['./questions.page.scss'],
})

export class QuestionsPage implements OnInit {
    public options = {
        initialSlide: 0,
        speed: 400
      };
    userid: string;
    testID: any;
    sectionId: any;
    sectionName: any;
    timer: any;
    title: any;
    Questions: any;
    questionsOver: any=[];
    cancel: boolean = true;
    nextbtn: boolean = true;
    qInfo: any=[];
    count: any;
    quesList: any;
    @ViewChild('mySlider') slides: IonSlides;
    module_id: any;
    CourseId: any;

    constructor(public router:Router, private commonService: CommonService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private webService: WebService) {
        this.activatedRoute.params.subscribe(params => {
            this.sectionId=params['sectionId'];
            
            localStorage.setItem("sectinoID",this.sectionId);
            this.testID=params['testID'];
            localStorage.setItem("testID",this.testID);
            
            this.sectionName=params['sectionName'];
            
            this.timer=params['timer'];
            this.module_id=params['module'];
            this.CourseId=params['back']
            //this.timer='01';    //To change timer for testing
            
        });
    }

    ngOnInit() {
        this.userid = localStorage.getItem("Userid");
        
        var stime = this.startTime();
        localStorage.setItem("stime",this.dayTime());
        this.GetQuestions();
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

    GetQuestions(){
        this.commonService.presentLoading();
        var id = this.sectionId;
        var testID = this.testID;
        var minutes = this.timer;

        if(testID == 0){
           localStorage.setItem("testID",'1');
        }
        else{
            localStorage.setItem("testID",this.testID);
        }

        this.title = this.sectionName;

        

        var stime = localStorage.getItem("stime");
        var lnk = 'GetQuestions/?sectionid='+id+'&userId='+this.userid+'&starttime='+stime+'&testID='+testID;
        this.commonService.closeLoading();
        this.webService.GetQuestions(lnk).then(
            (Response: any) => {

                this.Questions = Response;
                this.Questions.forEach((value, key) => {
                    this.questionsOver[key] = value;
                });

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
                    } else {
                        function twoDigits( n )
                        {
                            return (n <= 9 ? "0" + n : n);
                        }
                        //showSlide = true;
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
                endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
                updateTimer();
            },
            err => {
                this.commonService.closeLoading();
                this.commonService.presentToast(`Connection error`);
            }
        );
    }

    next(){
        
        this.slides.slideNext();

        this.slides.getActiveIndex().then(index => {
            
            if(index == 0 || index == undefined){
                this.cancel = true;
            }
            else if ((index+1) == this.questionsOver.length){
                this.nextbtn = false;
            }else{
                
                this.cancel = false;
            }

        });
    }

    prev(){
        this.slides.slidePrev();
        this.slides.getActiveIndex().then(index => {
            
            if(index == 0){
                this.cancel = true;
            }
            else if ((index+1) != this.questionsOver.length){
                this.nextbtn = true;
            }
        });
    }

    close(){
        // this.router.navigate([`/trainingcenter/`])
        this.router.navigate([`/home-details/${this.module_id}`],{queryParams: {back: this.CourseId}});

    }

    answerCheck(questionsOver,sectinoID){
        
        
        this.qInfo = questionsOver;
        
        localStorage.setItem("qInfo",JSON.stringify(this.qInfo));
        this.count = 0;
        var qList = '';
        var comma = ',';
        var pipe = '|';
        for(var i =0;i<this.qInfo.length;i++){
            var c = this.qInfo[i].correct;
            var Qs = this.qInfo[i].QSelected;
            var Qid = this.qInfo[i].qId;
            if(this.qInfo.length == i+1)
            {
                var comma = '';
            }
            if(Qs == null || Qs == false)
            {
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
        this.router.navigate([`/answerscheck/${sectinoID}/${"CompleteExam"}`]);
    }
}