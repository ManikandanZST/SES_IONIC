import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/providers/login.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})

export class ContactusPage implements OnInit {
  type: any;
  contact:any=[];

  constructor(private activatedRoute: ActivatedRoute,public router:Router,private loginService: LoginService,private socialSharing: SocialSharing) { 
    this.activatedRoute.params.subscribe(params => {
      this.type=params['type'];
    });
  }

  ngOnInit() {
    this.getcontact();
  }
  close(){
    this.router.navigate([`home/${this.type}`])

  }

  getcontact(){
      var lnk =  'GetContent/4';
      this.loginService.getData(lnk).then(
      (Response: any) => {

        if(Response)
        {
          this.contact=Response;
          console.log(this.contact,"contact")
        }else{
        
        }
      },
      err => {
    
      }
    );
  } 
  
  emailshare(){
    // Share via email
    var message = "Hi Shawneerct Admin, Please find my below message";
    var subject = "Shawneerct App Users Reviews";
    var toArr ="admin@shawneerct.com";    

    this.socialSharing.shareViaEmail(message, subject, [toArr]).then(() => {
      //console.log("test");
      // Success!
    }).catch((error) => {
      //console.log("error",error);
      // Error!
    });
  }
}
