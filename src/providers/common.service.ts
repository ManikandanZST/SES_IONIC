import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
// import { Storage } from "@ionic/storage";
declare let $:any;
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(public toastController: ToastController,public loadingController: LoadingController,) {
   }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4500,
      position: "bottom",
      animated: true,
      cssClass:'toast-app',
      buttons: [
        {
          text: 'X',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }
  async longToast(msg: string, duration: number = 6500) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      position: "bottom",
      animated: true,
    });
    toast.present();
  }
  async presentLoading(msg: string = "Please wait...", duration = 600000) {
    const loading = await this.loadingController.create({
      message: msg,
      spinner: "lines",
      duration: duration,
    });
    await loading.present();
  }
  async closeLoading() {
    //   this.loadingController.dismiss();
    setTimeout(async () => {
      try {
        let topLoader = await this.loadingController.getTop();
        while (topLoader) {
          if (!(await topLoader.dismiss())) {
            throw new Error(
              "Could not dismiss the topmost loader. Aborting..."
            );
          }
          topLoader = await this.loadingController.getTop();
        }
      } catch (e) {
      }
    }, 800);
  }
  async validateEmail(email: string) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email) && email.indexOf(" ") == -1;
  }
  validatephone(val: any) {
    const re = /^(\+\d{1,3}[- ]?)?\d{9,15}$/i;
    return  re.test(val)
  }
  async validateMobileNumber(val: any) {
    var re = /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/i;
    if (re.test(val)) {
      return true;
    } else {
      return false;
    }
  }
  async validateNumber(val: any) {
    var re =  /^[0-9]+$/;
    if (re.test(val)) {
      return true;
    } else {
      return false;
    }
  }
  iniTialSmoothScrool() {
    $('body, html').animate({ scrollTop: 0 }, 500);
  }
  async logout() {
    localStorage.removeItem('ParkingUserId');
    localStorage.removeItem('ParkingUserDetails');
    localStorage.removeItem('ParkingToken');
    localStorage.clear();
  }
}
