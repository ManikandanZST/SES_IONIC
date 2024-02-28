import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-sign-up-detail',
  templateUrl: './sign-up-detail.component.html',
  styleUrls: ['./sign-up-detail.component.scss'],
})
export class SignUpDetailComponent implements OnInit {
  type: any;
  constructor(private router: Router,public modalController: ModalController,) { }
  ngOnInit() {}
  SignUp(val){
    this.type=val;
    if(this.type=="individual"){
      this.router.navigate([`/signup/${this.type}`])
      this.close();
    }else if(this.type=="group"){
      this.close();
      this.router.navigate([`/signup/${this.type}`])
    }else{
      this.router.navigate([`/signup/${this.type}`])
      this.close();
    }
  }
  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalController.dismiss(closeModal);
  }
}
