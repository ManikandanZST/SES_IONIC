import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PopoverController, ModalController, AlertController } from "@ionic/angular";
import { CommonService } from 'src/providers/common.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})

export class PopoverComponent implements OnInit {

    GroupId: string;
    IndividualId: string;
    type: any;
    user_type: string;

    constructor(
        public router: Router,
        public popOver: PopoverController,
        private alertCtrl: AlertController,        
        private modalCtrl: ModalController,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(params => {
            // console.log(params['type']);
            this.type=params['type'];
            console.log(this.type);      
        });
    }

    async GotoSettings(page) {        
        this.type=localStorage.getItem('type');
        //console.log("saravana", page);
        //console.log(this.type);
        if(this.type=="individual"){
            //console.log(`/`+page+`/${this.type}`);
            this.router.navigate([`/`+page+`/${this.type}`])
        }else if(this.type=="group"){
            this.router.navigate([`/`+page+`/${this.type}`])
            // this.router.navigate([`/login/${this.type}`]).then(() => {
            //     localStorage.clear();
            //     window.location.reload();
            //   });
        }           
        //this.router.navigate(["/" + page, {}]);
        this.popOver.dismiss();
    }

    ngOnInit(): void {
        this.GroupId=localStorage.getItem("loginuserid");
        this.IndividualId=localStorage.getItem("Userid");
        this.user_type=localStorage.getItem("type");
    }
    logout(){
        this.type=localStorage.getItem('type');
        console.log(this.type);
          if(this.type=="individual"){
            this.router.navigate([`/login/${this.type}`]).then(() => {
              localStorage.clear();
      
              window.location.reload();
            });
          }else if(this.type=="group"){
            this.router.navigate([`/login/${this.type}`]).then(() => {
              localStorage.clear();
              window.location.reload();
            });
      
          }
      
        }
}