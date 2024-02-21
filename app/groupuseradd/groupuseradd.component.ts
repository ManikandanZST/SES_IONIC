import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-groupuseradd',
  templateUrl: './groupuseradd.component.html',
  styleUrls: ['./groupuseradd.component.scss'],
})
export class GroupuseraddComponent implements OnInit {
  type: string;
  createuser: any;

  constructor(public router:Router,public modalController:ModalController) { }

  ngOnInit() {
    this.type=localStorage.getItem("type");

  }
  addnewuser(type){
    this.createuser=type;
     this.close();
     if(type=='new'){
    this.router.navigate([`/home/${this.type}/newuser`]);
     }else{
      this.router.navigate([`/home/${this.type}/existuser`]);

     }
  }
  async close() {
    // const closeModal: string = "Modal Closed";
    var typecreate=this.createuser;
    await this.modalController.dismiss(typecreate);
  }
}
