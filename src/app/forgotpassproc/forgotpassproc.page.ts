import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
@Component({
    selector: 'app-forgotpassproc',
    templateUrl: './forgotpassproc.page.html',
    styleUrls: ['./forgotpassproc.page.scss'],
})
export class ForgorPassProcPage implements OnInit {
    ulogin:any=[];
    utype:any;
    constructor(private commonService:CommonService, private router: Router, private loginService: LoginService, public alertController: AlertController, private activatedRoute: ActivatedRoute, public modalCtrl:ModalController, private navCtrl: NavController) {
    }
    ngOnInit() {
    }
    close(){
        this.navCtrl.back();
    }
    async nextPass(ulogin){
        var email = ulogin.email;
        if(ulogin === undefined || ulogin === '')
        {
            this.commonService.presentToast("Fields are required.");
        }
        else if(email === undefined || email == '')
        {
            this.commonService.presentToast("Enter email.");
        }
        else if((await this.commonService.validateEmail(email)) == false)
        {
            this.commonService.presentToast("Enter valid email address.");
        }
        else
        {
            this.commonService.presentLoading();
            var data = 'email='+email;
            this.loginService.forgetPassPUsers(data).then(
                async (Response: any) => {
                    this.commonService.closeLoading();
                    if(Response.Status == "Success"){
                        const alert = await this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: '',
                            subHeader: 'Forget Password Alert!',
                            message: '<p>'+Response.Message+'</p>',
                            buttons: [
                              {
                                text: "Okay",
                                cssClass: 'alert-button-confirm',
                                handler: () => {
                                    this.router.navigate([`/trainingcenter`])
                                }
                              }
                            ]
                        });
                        await alert.present();
                    }
                    else{
                        this.commonService.presentToast(Response.Message);
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