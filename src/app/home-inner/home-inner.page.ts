import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
@Component({
  selector: 'app-home-inner',
  templateUrl: './home-inner.page.html',
  styleUrls: ['./home-inner.page.scss'],
})
export class HomeInnerPage implements OnInit {
  CourseId: any;
  subcourselist: any={};
  sectionlist: any={};
  type: any;
  getpage: any;
  constructor(private activatedRoute: ActivatedRoute,public loginService:LoginService,public router:Router, private commonService: CommonService) {
    this.activatedRoute.params.subscribe(params => {
      this.CourseId=params['id'];
   });
  }
  ngOnInit() {
    this.type=localStorage.getItem('type');
    this.getcourse();
  }
  getcourse(){
    this.commonService.presentLoading();
    var id=this.CourseId;
      var lnk =  'GetCourses?id='+id;
      this.loginService.getData(lnk).then(
      (Response: any) => {
        this.commonService.closeLoading();
        if(Response)
        {
          this.subcourselist=Response;
        }else{
        }
      },
      err => {
      }
    );
  }
  trainingcourse(nodeid){
    this.router.navigate([`/home-inner/${nodeid}`])
  }
  coursePage(module_id,sid,sh_course){
    var uid=localStorage.getItem('Userid');
    if(uid == null){
      this.router.navigate([`login/individual`])
    }
    else{
      this.router.navigate([`/home-details/${module_id}`],{queryParams: {back: this.CourseId}});
    }
  }
  back(){
    if(this.type=='individual'){
      this.getpage = localStorage.getItem("pgtrain");
      if(this.getpage == '1'){
        localStorage.setItem("pgtrain", '0');
        this.router.navigate([`/trainingcenter`])
      }else{
        this.router.navigate([`/home/individual`])
      }
    }
    else if(this.type=='common'){
      this.router.navigate([`/home/common`])
    }
  }
}
