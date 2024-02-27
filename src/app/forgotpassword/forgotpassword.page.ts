import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ForgorPassConfirmPage } from '../forgotpassconfirm/forgotpassconfirm.page';

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.page.html',
    styleUrls: ['./forgotpassword.page.scss'],
})

export class ForgorPasswordPage implements OnInit {

    type: any;
    utype: any;
    ulogin:any=[];
    forgetPass: any;
    typeUser: any;

    constructor(private commonService:CommonService, private router: Router, private loginService: LoginService, public alertController: AlertController, private activatedRoute: ActivatedRoute, public modalCtrl:ModalController) {
        this.activatedRoute.params.subscribe(params => {
            
            this.type=params['id'];
        });
    }

    ngOnInit() {
        if(this.type=="individual"){
            this.utype = "User";
            this.typeUser = "user";
        }
        else if(this.type=="group"){
            this.utype = "Group User";
            this.typeUser = "group";
        }
    }

    close(){
        if(this.type=="individual"){
            this.router.navigate([`/login/${this.type}`])
        }else if(this.type=="group"){
            this.router.navigate([`/login/${this.type}`])
        }
    }

    async nextPass(ulogin){

        var email = ulogin.email;

        if(ulogin === undefined || ulogin === ''){
            this.commonService.presentToast("Fields are required.");
        }else if(email === undefined || email == ''){
            this.commonService.presentToast("Enter email.");
        }else if((await this.commonService.validateEmail(ulogin.email)) == false){
            this.commonService.presentToast("Enter valid email address.");
        }else{
            this.commonService.presentLoading();
            var lnk =  'GetUserByEmail/?email='+email+'&type='+this.typeUser;
            this.loginService.getData(lnk).then(
                (Response: any) => {
                    this.commonService.closeLoading();
                    
                    if(Response.Status == "Success")
                    {
                        this.forgetPass=Response;
                        
                        this.router.navigate([`forgotpassconfirm/${ulogin.email}/${this.type}`]);
                        // this.modalCtrl.create({
                        //     component: ForgorPassConfirmPage,
                        //     componentProps: {
                        //         email: ulogin.email,
                        //         type: this.type
                        //     }
                        // })
                        // .then(modalData=>{
                        //     modalData.onDidDismiss().then(res=>{
                        
                        //       if(res.data){
                        //           this.ngOnInit();
                        //       }
                        //     });
                        //     modalData.present();
                        // })
                        //this.router.navigate([`aboutus`]);
                    }else{
                        this.commonService.presentToast("Your Email id not registered.");
                    }

                },
                err => {
                    this.commonService.closeLoading();
                    this.commonService.presentToast("Connection Error.");
                }
            );
        }
    }
}
