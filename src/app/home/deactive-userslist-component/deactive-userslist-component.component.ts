import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EditgroupuserComponent } from 'src/app/editgroupuser/editgroupuser.component';
import { GroupuseraddComponent } from 'src/app/groupuseradd/groupuseradd.component';
import { CommonService } from 'src/providers/common.service';
import { LoginService } from 'src/providers/login.service';
@Component({
  selector: 'app-deactive-userslist-component',
  templateUrl: './deactive-userslist-component.component.html',
  styleUrls: ['./deactive-userslist-component.component.scss'],
})
export class DeactiveUserslistComponentComponent implements OnInit {
  type: any;
  GroupId: string;
  userlist: any;
  search: boolean=false;
  filterData: any;
  searchTerm: any;

  constructor(private activatedRoute: ActivatedRoute,private loginService: LoginService,public router:Router,
    private modalCtrl:ModalController,private alertController:AlertController,public commonService:CommonService
    ) {
    this.activatedRoute.params.subscribe(params => {
      this.type=params['type'];

 });
  }

  ngOnInit() {
    this.GroupId=localStorage.getItem("loginuserid")
    this.GetGroupUser();
    

  }
  ionViewWillEnter() {
    
    this.GetGroupUser();


  }
  GetGroupUser(){
    var lnk =  'GetGroupUser?GroupId='+this.GroupId;
    this.loginService.getData(lnk).then(
    (Response: any) => {

      if(Response)
      {
      this.userlist=Response.UserList;
  
      }else{

      }
    },
    err => {

    }
  );
}

//search data
setFilteredLocations(){
  this.search=true;
  this.filterData = this.userlist.filter((location) => {
    return location.fullName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
  });
}
onCancel($event){
  this.search=false;
  this.filterData=this.userlist
  $event.target.value = '';

}

//editlist
async showModalUEdit(id){
  const modal = await this.modalCtrl.create({
    component: EditgroupuserComponent,
    componentProps: {
      "id": id,
    },
    cssClass: 'my-custom-modal-css',
    swipeToClose: true,
  });
  modal.onDidDismiss().then((result) => {

   })
  return await modal.present();
}

// deleteuser
async deleteUser(uid,lk){
  if(lk == 0)
  {
    var mssg = 'Do you want to deactivate the user?';

  }else{
    var mssg = 'Do you want to activate user?';

  }
  var id = localStorage.getItem("loginuserid");
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: '',
    subHeader: 'Alert',
    message: mssg,
    buttons: [
      {
        text: "Cancel",
        cssClass: 'alert-button-cancel',
        role: "cancel",
      },
      {
        text: "Continue",
        cssClass: 'alert-button-confirm',
        handler: () => {
          var url='UpdateGroupUserStatus/';
          var data = 'userId='+uid+'&Group_id='+id;
          this.loginService.postdata(data,url).then((Response: any) => {
             
             if(Response.Status == 'Success'){

               this.commonService.closeLoading();
                  // this.signupdetails = Response.data[0];
                  
               this.commonService.presentToast(Response.Message);
               this.GetGroupUser();
             }else{
              this.commonService.presentToast(Response.Message);
               this.commonService.closeLoading();
             }
           },
           err => {
             this.commonService.closeLoading();
             this.commonService.presentToast(`Connection error`);
           }
         );
        }


      }
    ],


  });
  await alert.present();

}

async chooseActionsheet(){
  const modal = await this.modalCtrl.create({
    component: GroupuseraddComponent,
    componentProps: {
      // "court": this.club,
      // court: "Test Title",
    },
    cssClass: 'my-custom-modal-css',
    swipeToClose: true,
    // breakpoints: [0, 0.25, 0.5, 0.75],
        initialBreakpoint: 0.3,

  })
  return await modal.present();
}
}
