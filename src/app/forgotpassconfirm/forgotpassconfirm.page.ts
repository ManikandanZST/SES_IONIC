import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
@Component({
    selector: 'app-forgotpassconfirm',
    templateUrl: './forgotpassconfirm.page.html',
    styleUrls: ['./forgotpassconfirm.page.scss'],
})
export class ForgorPassConfirmPage implements OnInit {
    type: any;
    utype: any;
    typeUser: any;
    forgetPass: any;
    HintQuestion: any;
    HintAnswer:any=[];
    email: any;
    constructor(private commonService:CommonService, private router: Router, private loginService: LoginService, public alertController: AlertController, private activatedRoute: ActivatedRoute, public modalCtrl:ModalController, private navCtrl: NavController) {
        this.activatedRoute.params.subscribe(params => {
            this.email=params['email'];
            this.type=params['type'];
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
        this.getuserbyemail();
    }
    getuserbyemail(){
        var lnk =  'GetUserByEmail/?email='+this.email+'&type='+this.typeUser;
        this.loginService.getData(lnk).then(
            (Response: any) => {
                this.commonService.closeLoading();
                if(Response.Status == "Success")
                {
                    this.forgetPass=Response;
                    this.HintQuestion = this.forgetPass.question;
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
    close(){
        // if(this.type=="individual"){
        //     this.router.navigate([`/forgotpassword/${this.type}`])
        // }else if(this.type=="group"){
        //     this.router.navigate([`/forgotpassword/${this.type}`])
        // }
        this.navCtrl.back();
    }
    nextPass(ulogin){
        var question    = this.forgetPass.question;
        var email   = this.email;
        var answer    = this.forgetPass.answer;
        var correctanswer    = ulogin.answer;
        if(correctanswer === undefined || correctanswer == '')
        {
            this.commonService.presentToast("Enter answer.");
        }else if(answer !== correctanswer)
        {
            this.commonService.presentToast("Enter correct answer.");
        }
        else{
            if(this.typeUser == 'group')
            {
                var data = 'Hint_Question='+question+'&Hint_Answer='+correctanswer+'&email='+email;
                var linkPath = 'NormalGroupForgotPass';
            }else {
                var data = 'question='+question+'&answer='+correctanswer+'&email='+email;
                var linkPath = 'NormalUserForgotPass';
            }
            this.commonService.presentLoading();
            this.loginService.forgetPassiUsers(data,linkPath).then(
                async (Response: any) => {
                    this.commonService.closeLoading();
                    if(Response.Status == 'Success'){
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
                                    if(this.type=="individual"){
                                        this.router.navigate([`/login/${this.type}`])
                                    }else if(this.type=="group"){
                                        this.router.navigate([`/login/${this.type}`])
                                    }
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
                    this.commonService.presentToast(`Connection error`);
                }
            );
        }
    }
}
