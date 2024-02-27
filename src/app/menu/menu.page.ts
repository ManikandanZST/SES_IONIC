import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/providers/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  appPages: { title: string; url: string; icon: string; }[];

  constructor(private auth:AuthService,public nav:NavController) { }

  ionViewWillEnter(){
    if(this.auth.isIndividual){
       this.appPages = [
        { title: 'Home', url: 'home', icon: 'home' },
        { title: 'My Profile', url: 'myprofile', icon: 'person' },
      ]
    }else{
      this.appPages = [
        { title: 'hgd', url: 'home', icon: 'home' },
        { title: 'My ', url: 'myprofile', icon: 'person' },
      ]
    }

  }
OpenPage(page){
  this.nav.navigateRoot(page);
}

ionViewCanEnter(){
  return this.auth.isLoggedIn();
}
  ngOnInit() {
  }


}
