import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/providers/login.service';
import { ValuePackComponent } from '../value-pack/value-pack.component';

@Component({
  selector: 'app-training-center',
  templateUrl: './training-center.component.html',
  styleUrls: ['./training-center.component.scss'],
})
export class TrainingCenterComponent implements OnInit {
  valuepacks:any=[];
  indexValue: any;
  multipleLists: any[];
  subCourse: any;
  constructor(public loginService:LoginService,public modalctrl:ModalController,public router:Router) { }

  ngOnInit() {
    this.valuepack();
  }
  valuepack(){
    var uid=localStorage.getItem('Userid');
   
    var lnk='GetUserValuePack?UserId='+uid;
    this.loginService.getData(lnk).then(
      (Response: any) => {
  
        if(Response)
        {
        this.valuepacks=Response;
        console.log(this.valuepacks,"valuepack")
        console.log(Response,"Response")
       
        }else{
         
        }
      },
      err => {
     
      }
    );
  }
  async showCourse(index, data){
    console.log(data);
    console.log(index);
    this.subCourse =data.ModuleList;
    console.log(this.subCourse);

      const modal = await this.modalctrl.create({
        component: ValuePackComponent,
        componentProps: { 
          "subCourse": this.subCourse,
          "heading":data
        },
        cssClass: 'my-custom-modal-css',
        swipeToClose: true,
      });
      modal.onDidDismiss().then((result) => {
  
    console.log(result,"total")
       })
      return await modal.present();
    }
    back(){
      this.router.navigate(['trainingcenter']);
    }
}
