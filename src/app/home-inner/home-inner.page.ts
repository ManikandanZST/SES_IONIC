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
      console.log(params);
      this.CourseId=params['id'];      
      console.log(this.CourseId);      
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
          console.log(this.subcourselist.Course,"courselist")
        }else{
         
        }
      },
      err => {
     
      }
    );
  } 
  trainingcourse(nodeid){
    console.log(nodeid,"training");
    this.router.navigate([`/home-inner/${nodeid}`])
  //   var uid=localStorage.getItem('Userid');
  //   var lnk =  'GetModulesList/?nodeid='+nodeid+'&userId='+uid;
  //   this.loginService.getData(lnk).then(
  //   (Response: any) => {

  //     if(Response)
  //     {
  //       this.sectionlist=Response;
  //       console.log(this.sectionlist.sectionlist,"courselist")
  //     }else{
       
  //     }
  //   },
  //   err => {
   
  //   }
  // );
  }
  coursePage(module_id,sid,sh_course){
    console.log(module_id);
    var uid=localStorage.getItem('Userid');
    if(uid == null){
      this.router.navigate([`login/individual`])
    }
    else{
      this.router.navigate([`/home-details/${module_id}`],{queryParams: {back: this.CourseId}});  
    }
    //this.router.navigate([`/home-details/${module_id}`],{queryParams: {back: this.CourseId}});

  }
  back(){
    if(this.type=='individual'){
      this.getpage = localStorage.getItem("pgtrain");
      //console.log("Saravana",this.getpage);      
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
    //this.router.navigate([`/home/individual`])

  }
}
