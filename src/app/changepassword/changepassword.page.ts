import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})

export class ChangepasswordPage implements OnInit {

    GroupId: string;
    IndividualId: string;
    CustomersForm: any={
        oldpassword: '',
        newpassword: '',
        confirmpassword: ''
    };
    type: any;
    info: any={};
    currentpassword: any;

    constructor(public router:Router, private commonService: CommonService, private common: CommonService, private loginService: LoginService,private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            
            this.type=params['type'];
            
        });
    }

    ngOnInit() {
        this.GroupId=localStorage.getItem("loginuserid");
        this.IndividualId=localStorage.getItem("Userid");
        this.CustomersForm.oldpassword = '';
        this.CustomersForm.newpassword = '';
        this.CustomersForm.confirmpassword = '';
        this.GetUser();
    }

    GetUser()
    {
        if(this.type=="group"){
            var lnk =  'GetGroupUser?GroupId='+this.GroupId;
        }else
        {
            var lnk =  'GetUser/'+this.IndividualId;
        }

        this.loginService.getData(lnk).then(
            (Response: any) => {
              //
              if(this.type=="individual")
              {
                // 
                this.info=Response;
                this.currentpassword=this.info.password;
              }else{
                //
                this.info=Response.Group;
                this.currentpassword=this.info.Password;
              }
            },
            err => {

            }
        );
    }

    customerchangepassword(CustomersForm)
    {
        if (CustomersForm.oldpassword == "" || CustomersForm.oldpassword == undefined) {
            this.commonService.presentToast("Enter Old Password");
            //
        } else if(CustomersForm.newpassword == "" || CustomersForm.newpassword == undefined) {
            //
            this.commonService.presentToast("Enter New Password");
        }else if(CustomersForm.confirmpassword == "" || CustomersForm.confirmpassword == undefined) {
            //
            this.commonService.presentToast("Enter Confirm Password");
        }else if(CustomersForm.newpassword != CustomersForm.confirmpassword) {
            //
            this.commonService.presentToast("Password and Confirm Password does not match.");
        }else if(this.currentpassword != CustomersForm.oldpassword){
            //
            this.commonService.presentToast("Old password wrong. Please enter correct password.");
        }else{
            if(this.type == "individual"){
                var id = this.IndividualId;
                var data = 'userId='+id+'&password='+CustomersForm.newpassword;
                //
                this.loginService.changepassword_individual(data).then((res) => {

                    if (res.Status == 'Success') {
                        this.logout();
                    } else {
                    // this.alert.errorMsg(res.error, '');
                    }
                  }, err => {
                    
                    // this.alert.errorMsg('Connection Error', '');
                });
            }
            else{
                var id = this.GroupId;
                var data = 'Group_Id='+id+'&password='+CustomersForm.newpassword;
                
                this.loginService.changepassword_group(data).then((res) => {

                    if (res.Status == 'Success') {
                        this.logout();
                    } else {
                    // this.alert.errorMsg(res.error, '');
                    }
                  }, err => {
                    
                    // this.alert.errorMsg('Connection Error', '');
                });
            }
        }
    }

    logout(){
        this.type=localStorage.getItem('type');
        
        if(this.type=="individual"){

            this.router.navigate([`/login/${this.type}`]).then(() => {
                localStorage.clear();
                //
                this.common.presentToast('Password updated successfully. Please Login again.');
                setTimeout(() => {
                    //
                    window.location.reload();
                }, 2000);

            });
        }else if(this.type=="group"){
            this.common.presentToast('Updated Successfully');
            this.router.navigate([`/login/${this.type}`]).then(() => {
                localStorage.clear();
                //
                this.common.presentToast('Password updated successfully. Please Login again.');
                setTimeout(() => {
                    //
                    window.location.reload();
                }, 2000);
            });
        }
    }

    cancelevent(){
        this.type=localStorage.getItem('type');
        //
        if(this.type=="individual"){
            this.router.navigate([`/myprofile/${this.type}`])
        }else if(this.type=="group"){
            this.router.navigate([`/myprofile/${this.type}`])
        }
    }
}
