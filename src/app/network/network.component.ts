import { Component, OnInit } from '@angular/core';
import {  ModalController, Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {

  constructor(private network: Network,private nativeSettings: OpenNativeSettings,private platform: Platform, private modalController:ModalController ) {}

  ngOnInit() {
    this.network.onConnect().subscribe(() => {
      console.log('Connected to the internet!');
      this.close()
    });
  }

  async close(){
    await    this.modalController.dismiss();
    }

  openNetworkSettings() {
    if (this.platform.is('cordova')) {
      // this.network.openWifiSettings();
      this.nativeSettings.open('wifi');
    } else {
      console.log('Opening network settings is not supported on this platform.');
    }
  }
}
