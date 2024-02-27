import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';
import { WebService } from '../../providers/web.service';

@Component({
  selector: 'app-examguidence',
  templateUrl: './examguidence.page.html',
  styleUrls: ['./examguidence.page.scss'],
})

export class ExamGuidencePage implements OnInit {

    examguidence:any=[];
    IndividualId: string;

    constructor(public router:Router, private commonService: CommonService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private webService: WebService) {

    }

    ngOnInit() {
        this.IndividualId=localStorage.getItem("Userid");
        this.getexamguidence();
        //this.commonService.closeLoading();
    }

    getexamguidence(){
        this.commonService.presentLoading();
        var lnk =  'GetContent/3';
        this.loginService.getData(lnk).then(
            (Response: any) => {

                if(Response)
                {
                    this.commonService.closeLoading();
                    this.examguidence=Response;
                  
                }else{

                }
            },
            err => {
                this.commonService.closeLoading();
                this.commonService.presentToast(`Connection error`);
            }
        );
    }

    back(){
        this.router.navigate([`home/individual`]).then(()=>{
         // window.location.reload()
        });
    }

    trainsection(){
        if(this.IndividualId != null){
            this.router.navigate([`/trainingcenter`])
        }
        else{
            this.router.navigate([`/login/individual`])
        }
    }
}