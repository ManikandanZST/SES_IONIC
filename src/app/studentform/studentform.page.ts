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
                console.log("completed", Response);
                this.completedcourseinfo = Response.filter(course => course.ModuleName !== null);
                console.log("completedinfo", this.completedcourseinfo);

            },
            err => {
             
            }
        );
    }

    GetUserInfo(){
        var lnk =  'GetUser/'+this.IndividualId;
        this.loginService.getData(lnk).then(
            (Response: any) => {
                //console.log("UserInfo",Response);
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
        //console.log("ssk", this.courselist);
    }

    handleChange(ev) {        
        this.selectedcourse = ev.target.value;
        //console.log("selectedcourse",this.selectedcourse);        
        this.totalselected = this.selectedcourse.length;
    }

    onCancel($event){
        this.search=false;
        this.filterData=this.courselist
        $event.target.value = '';      
    }    

    async studentformsubmit(Student,courses){
        //console.log("form submit - Student details",Student);
        //console.log("form submit - Courses details",courses);
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
            //console.log("success");
            var data = 'UserId='+this.IndividualId+'&CompletedCourse='+courses+'&StudentID='+studentid+'&StudentSSN='+studentssn+'&Date='+date+'&StudentName='+studentname+'&StudentEmailAddress='+email+'&StudentPhone='+phone+'&StudentMailingAddress='+mailing;
            //console.log(data);

            this.common.presentLoading();
            this.webService.studentform(data).then((res) => {

                if (res.Status == 'Success') {
                    this.common.closeLoading();
                    this.common.presentToast('Updated Successfully');
                    this.isModalOpen = true;
                    //console.log("selected Courses",this.selectedcourse);
                } else {
                    this.common.closeLoading();
                    this.common.presentToast('Connection Error');
                // this.alert.errorMsg(res.error, '');
                }
              }, err => {
                this.common.closeLoading();
                //console.log(err);
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
        console.log("event",event);
        console.log("Checkbox",checkbox);
        if ( event.detail.checked ) {
            //console.log("event checked");
            this.checked.push(checkbox);     
            this.courselists = JSON.parse(JSON.stringify(this.checked));
            console.log("final Checkbox",this.checked);
            console.log("final courselists",this.courselists);
            console.log("length courselists",this.courselists.length);
            var ar=[];     
            var aa = '';   
            var count = 0;   
            for (var i = 0; i < this.courselists.length; i++) {
                console.log("final i",this.courselists,i);

                var aa = aa + this.courselists[i].ModuleType;
                if (i !== this.courselists.length - 1) {
                  aa = aa + ', ';
                }
              }
              this.courseslists = aa;
              console.log(this.courseslists, "comma course");
              
    
        } else {
            //console.log("event unchecked");
            let index = this.removeSelectedCourseFromArray(checkbox);
            this.checked.splice(index,1);
            console.log("remov Checkbox",this.checked);

        }        
    }

    removeSelectedCourseFromArray(checkbox : String) {
        return this.checked.findIndex((category)=>{
          return category === checkbox;
        })        
    }

    async issuecertficate(courseslist,email,mailing,username){
        console.log(courseslist,"courseslist")
        if(courseslist === undefined || courseslist === '')
        {    
            this.common.presentToast('Choose your completed course')
  
        }else
        {
          var uid = this.IndividualId;
          var data = 'UserId='+uid+'&CourseList='+courseslist+'&UserEmail='+email+'&UserMailingAddress='+mailing;
          console.log(data);
          this.common.presentLoading();
          this.webService.studentformIssue(data).then(async (res) => {
                        console.log("studentformIssue",res);
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
                                        console.log('Confirm Okay');   
                                     this.openPageFormok(false);
                                        // this.router.navigate([`home/individual`]).then(()=>{
                                        //     this.app.ngOnInit();

                                        // });   
                                    }
                                }],
                            });
                            await alert.present();                    
                            //this.isModalOpen = true;
                            //console.log("saravana selected Courses",this.selectedcourse);
                        } else {
                            this.common.closeLoading();
                            this.common.presentToast(res[0].Message);
                        // this.alert.errorMsg(res.error, '');
                        }
                    }, err => {
                        this.common.closeLoading();
                        //console.log(err);
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
            //console.log("ssk", this.courselist);
        }
        onModalDismiss() {
            // Execute your desired function here
            console.log('Modal dismissed');
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
    //         //console.log("success");
    //         var Moduletype;
    //         //console.log("courselist", courseslist.length);
    //         //console.log("type", Moduletype);

    //         for(var i=0; i<courseslist.length; i++){
    //             Moduletype = courseslist[0].ModuleType;
    //             //console.log("moduletype",Moduletype);
    //         }

    //         var data = 'UserId='+this.IndividualId+'&CourseList='+Moduletype+'&UserEmail='+email+'&UserMailingAddress='+mailing+'&UserName='+username;
    //         //console.log(data);
            
    //         this.common.presentLoading();
    //         this.webService.studentformIssue(data).then(async (res) => {
    //             //console.log("studentformIssue",res);
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
    //                             console.log('Confirm Okay');   
    //                             this.router.navigate([`home/individual`]).then(()=>{
    //                                 window.location.reload()
    //                             });   
    //                         }
    //                     }],
    //                 });
    //                 await alert.present();                    
    //                 //this.isModalOpen = true;
    //                 //console.log("saravana selected Courses",this.selectedcourse);
    //             } else {
    //                 this.common.closeLoading();
    //                 this.common.presentToast(res[0].Message);
    //             // this.alert.errorMsg(res.error, '');
    //             }
    //         }, err => {
    //             this.common.closeLoading();
    //             //console.log(err);
    //             this.common.presentToast('Connection Error');
    //             // this.alert.errorMsg('Connection Error', '');
    //         });
    //     }
    // }
// }