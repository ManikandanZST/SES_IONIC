import { Component, OnInit } from '@angular/core';
import { ModalController, IonInfiniteScroll, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employeereport',
  templateUrl: './employeereport.component.html',
  styleUrls: ['./employeereport.component.scss'],
})
export class EmployeereportComponent implements OnInit {
  type: any;

  constructor(public modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.type=localStorage.getItem("type")
  }
  Report(val){
    // this.type=val;
    // console.log(this.type,"type")
    if(val=="training"){
      this.router.navigate([`/home/${this.type}/trainingreport`])
      this.close();
    }else if(val=="test"){
      this.close();
      //this.router.navigate([`/home/${this.type}/trainingreport`])
    }
  }
  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalController.dismiss(closeModal);
  }


}
