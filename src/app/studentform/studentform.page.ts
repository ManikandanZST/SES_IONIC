import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from '../../providers/login.service';
import { WebService } from '../../providers/web.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.page.html',
  styleUrls: ['./studentform.page.scss'],
})

export class StudentFormPage implements OnInit {

    IndividualId: string;
    completedcourseinfo: any=[];
    info: any={};
    courselist: any=[];
    student: any=[];
    studentid: any;
    studentssn: any;
    certificate: any;
    email: any;
    phone: any;
    mailing: any;
    StudentForm: any = [];
    isModalOpen = false;
    search: boolean=false;
    filterData: any;
    searchTerm: any;
    courses: any;
    selectedcourse = undefined;
    totalselected = 0;
    dd: any;
    MM: any;
    checked : any=[];

    public customOptions: any = {
        header: "Select Your Courses",
        cssClass: "popover-wide"
    };
    courselists: any;
    courseslists: string;

    constructor(public router:Router, private common: CommonService, private loginService: LoginService,public app: AppComponent, private activatedRoute: ActivatedRoute, private webService: WebService, private alertController: AlertController, public navCtrl: NavController) {

    }

    ngOnInit() {
        this.IndividualId=localStorage.getItem("Userid");
        this.GetCompletedCourse();
        this.GetUserInfo();
    }

    GetCompletedCourse(){
        var lnk =  'GetCompletedCourse/?UserId='+this.IndividualId;
        this.loginService.getData(lnk).then(
            (Response: any) => {
                
                this.completedcourseinfo = Response.filter(course => course.ModuleName !== null);
                

            },
            err => {

            }
        );
    }

    GetUserInfo(){
        var lnk =  'GetUser/'+this.IndividualId;
        this.loginService.getData(lnk).then(
            (Response: any) => {
                
                this.student = Response;

                //To display last four digit
                this.StudentForm.studentid = this.student.userId;
                var ssnnumber = this.student.SSN;
                var number = ssnnumber.substr(0,(ssnnumber.length - 1));
                this.StudentForm.studentssn = number.substr(-4, number.length);

                this.StudentForm.certificate = this.student.fullName;
                this.StudentForm.email = this.student.email;
                this.StudentForm.phone = this.student.phone;
                this.StudentForm.mailing = "";
            },
            err => {

            }
        );
    }

    close(){
        if(this.IndividualId != null){
            this.router.navigate([`/studentack`])
        }
        else{
            this.router.navigate([`/login/individual`])
        }
    }

    openPageForm(isOpen: boolean){
        this.isModalOpen = isOpen;
        this.courselist = this.completedcourseinfo;
        
    }

    handleChange(ev) {
        this.selectedcourse = ev.target.value;
        
        this.totalselected = this.selectedcourse.length;
    }

    onCancel($event){
        this.search=false;
        this.filterData=this.courselist
        $event.target.value = '';
    }

    async studentformsubmit(Student,courses){
        
        
        var studentid   = this.StudentForm.studentid;
        var studentssn    = this.StudentForm.studentssn;
        var studentname   = this.StudentForm.certificate;
        var email    = this.StudentForm.email;
        var phone    = this.StudentForm.phone;
        var mailing      = this.StudentForm.mailing;
        var courses      = courses;
        var date      = this.todaydateslash();

        if (this.StudentForm.studentid == null || this.StudentForm.studentid == '') {
            this.common.presentToast('Enter your Id')
        }else if (this.StudentForm.studentssn == null || this.StudentForm.studentssn == '') {
            this.common.presentToast('Enter your SSN')
        }else if (this.StudentForm.certificate == null || this.StudentForm.certificate == '') {
            this.common.presentToast('Enter Student Name')
        }else if (this.StudentForm.email == null || this.StudentForm.email == '') {
            this.common.presentToast('Enter your email')
        }else if (this.StudentForm.phone == null || this.StudentForm.phone == '') {
            this.common.presentToast('Enter your phone number')

        }else if (await this.common.validateNumber(this.StudentForm.phone) == false){
            this.common.presentToast('Enter valid  phone number');
        }
        else if (this.StudentForm.mailing == null || this.StudentForm.mailing == '') {
            this.common.presentToast('Enter your mailing address')
        }else if (courses == undefined || courses === '' || courses.length == 0){
            this.common.presentToast('Choose your completed course')
        }else if (this.StudentForm.studentid.length < 2){
            this.common.presentToast('Your ID must be greater than 2 letters!')
        }else if (await this.common.validateEmail(this.StudentForm.email) == false){
            this.common.presentToast('Enter valid email address');
        }else if (await this.common.validateEmail(this.StudentForm.mailing) == false){
            this.common.presentToast('Enter valid mailing address');
        }else if (await this.common.validateMobileNumber(this.StudentForm.phone) == false){
            this.common.presentToast('Enter valid phone number');
        }else{
            
            var data = 'UserId='+this.IndividualId+'&CompletedCourse='+courses+'&StudentID='+studentid+'&StudentSSN='+studentssn+'&Date='+date+'&StudentName='+studentname+'&StudentEmailAddress='+email+'&StudentPhone='+phone+'&StudentMailingAddress='+mailing;
            

            this.common.presentLoading();
            this.webService.studentform(data).then((res) => {

                if (res.Status == 'Success') {
                    this.common.closeLoading();
                    this.common.presentToast('Updated Successfully');
                    this.isModalOpen = true;
                    
                } else {
                    this.common.closeLoading();
                    this.common.presentToast('Connection Error');
                // this.alert.errorMsg(res.error, '');
                }
              }, err => {
                this.common.closeLoading();
                
                this.common.presentToast('Connection Error');
                // this.alert.errorMsg('Connection Error', '');
            });

        }

    }

    todaydateslash()
    {
        var  conDate = new Date();
        this.dd = conDate.getDate();
        this.MM = conDate.getMonth() + 1;
        var yy = conDate.getFullYear();
        var endmonth = yy+"-"+this.MM+"-"+this.dd;
        if(this.dd<10)
        {
            this.dd='0'+this.dd;
        }

        if(this.MM<10)
        {
            this.MM='0'+this.MM;
        }
        var endmonth1 = this.dd+"/"+this.MM+"/"+yy;
        return endmonth1;
    }

    addSelectedCourse(event, checkbox) {
        
        
        if ( event.detail.checked ) {
            
            this.checked.push(checkbox);
            this.courselists = JSON.parse(JSON.stringify(this.checked));
            
            
            
            var ar=[];
            var aa = '';
            var count = 0;
            for (var i = 0; i < this.courselists.length; i++) {
                

                var aa = aa + this.courselists[i].ModuleType;
                if (i !== this.courselists.length - 1) {
                  aa = aa + ', ';
                }
              }
              this.courseslists = aa;
              


        } else {
            
            let index = this.removeSelectedCourseFromArray(checkbox);
            this.checked.splice(index,1);
            

        }
    }

    removeSelectedCourseFromArray(checkbox : String) {
        return this.checked.findIndex((category)=>{
          return category === checkbox;
        })
    }

    async issuecertficate(courseslist,email,mailing,username){
        
        if(courseslist === undefined || courseslist === '')
        {
            this.common.presentToast('Choose your completed course')

        }else
        {
          var uid = this.IndividualId;
          var data = 'UserId='+uid+'&CourseList='+courseslist+'&UserEmail='+email+'&UserMailingAddress='+mailing;
          
          this.common.presentLoading();
          this.webService.studentformIssue(data).then(async (res) => {
                        
                        if (res[0].Status == 'Success') {
                            this.common.closeLoading();
                            //this.common.presentToast('Updated Successfully');
                            const alert = await this.alertController.create({
                                header: 'Certificate Issued!',
                                // subHeader: 'Important message',
                                cssClass : 'custom',
                                message: '<p>'+res[0].Message+'</p>',
                                buttons: [{
                                    text: 'Okay',
                                    handler: () => {
                                        
                                     this.openPageFormok(false);
                                        // this.router.navigate([`home/individual`]).then(()=>{
                                        //     this.app.ngOnInit();

                                        // });
                                    }
                                }],
                            });
                            await alert.present();
                            //this.isModalOpen = true;
                            
                        } else {
                            this.common.closeLoading();
                            this.common.presentToast(res[0].Message);
                        // this.alert.errorMsg(res.error, '');
                        }
                    }, err => {
                        this.common.closeLoading();
                        
                        this.common.presentToast('Connection Error');
                        // this.alert.errorMsg('Connection Error', '');
                    });
                }

        }
        openPageFormok(isOpen: boolean){
            this.isModalOpen = isOpen;
            this.courselist = this.completedcourseinfo;
            // if(this.isModalOpen == false){
            //     this.redirect();

            // }
            
        }
        onModalDismiss() {
            // Execute your desired function here
            
            this.router.navigate([`home/individual`]).then(()=>{
                this.app.ngOnInit();

            });         }
          }


    //     if (courseslist == undefined || courseslist === '' || courseslist.length == 0){
    //         this.common.presentToast('Choose your completed course')
    //     }else if (courseslist.length > 1){
    //         this.common.presentToast('Choose any one completed course')
    //     }
    //     else{
    
    //         var Moduletype;
    
    

    //         for(var i=0; i<courseslist.length; i++){
    //             Moduletype = courseslist[0].ModuleType;
    
    //         }

    //         var data = 'UserId='+this.IndividualId+'&CourseList='+Moduletype+'&UserEmail='+email+'&UserMailingAddress='+mailing+'&UserName='+username;
    

    //         this.common.presentLoading();
    //         this.webService.studentformIssue(data).then(async (res) => {
    
    //             if (res[0].Status == 'Success') {
    //                 this.common.closeLoading();
    //                 //this.common.presentToast('Updated Successfully');
    //                 const alert = await this.alertController.create({
    //                     header: 'Certificate Issued!',
    //                     // subHeader: 'Important message',
    //                     cssClass : 'custom',
    //                     message: '<p>'+res[0].Message+'</p>',
    //                     buttons: [{
    //                         text: 'Okay',
    //                         handler: () => {
    
    //                             this.router.navigate([`home/individual`]).then(()=>{
    //                                 window.location.reload()
    //                             });
    //                         }
    //                     }],
    //                 });
    //                 await alert.present();
    //                 //this.isModalOpen = true;
    
    //             } else {
    //                 this.common.closeLoading();
    //                 this.common.presentToast(res[0].Message);
    //             // this.alert.errorMsg(res.error, '');
    //             }
    //         }, err => {
    //             this.common.closeLoading();
    
    //             this.common.presentToast('Connection Error');
    //             // this.alert.errorMsg('Connection Error', '');
    //         });
    //     }
    // }
// }