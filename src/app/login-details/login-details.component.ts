import { Component, OnInit } from '@angular/core';
import { ModalController, IonInfiniteScroll, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss'],
})
export class LoginDetailsComponent implements OnInit {
  type: any;

  constructor(public modalController: ModalController, private router: Router, ) { }

  ngOnInit() {}

    SignIn(val){
      this.type=val;

      if(this.type=="individual"){
        this.router.navigate([`/login/${this.type}`])
        this.close();
      }else if(this.type=="group"){
        this.close();
        this.router.navigate([`/login/${this.type}`])
      }
    }
    async close() {
      const closeModal: string = "Modal Closed";
      await this.modalController.dismiss(closeModal);
    }

}
