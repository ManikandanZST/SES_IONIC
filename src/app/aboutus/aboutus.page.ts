import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/providers/login.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
  type: any;
  about:any=[];

  constructor(private activatedRoute: ActivatedRoute,public router:Router,private loginService: LoginService) { 
    this.activatedRoute.params.subscribe(params => {
      this.type=params['type'];
    });
  }

  ngOnInit() {
    this.getaboutus();
  }

  close(){
    this.type=localStorage.getItem('type');
    this.router.navigate([`home/${this.type}`])  
  }

  getaboutus(){
    var lnk =  'GetContent/1';
    this.loginService.getData(lnk).then(
      (Response: any) => {

        if(Response)
        {
          this.about=Response;
          console.log(this.about,"about")
        }else{
        
        }
      },
      err => {
    
      }
    );
  } 
}
