import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';
import { WebService } from '../../providers/web.service';

@Component({
  selector: 'app-studentack',
  templateUrl: './studentack.page.html',
  styleUrls: ['./studentack.page.scss'],
})

export class StudentAckPage implements OnInit {

  IndividualId: string;

  constructor(public router:Router, private commonService: CommonService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private webService: WebService) {
      
  }

  ngOnInit() {
    this.commonService.presentLoading();
    this.IndividualId=localStorage.getItem("Userid");
    this.commonService.closeLoading();
  } 

  back(){                
    this.router.navigate([`home/individual`]).then(()=>{
      //window.location.reload()
    });      
  }

  studentack(){
    if(this.IndividualId != null){
        this.router.navigate([`/studentform`])
    }
    else{
        this.router.navigate([`/login/individual`]) 
    }
  } 
}