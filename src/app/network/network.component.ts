import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {

  constructor(private nativeSettings: OpenNativeSettings,private platform: Platform, private network: Network) {}

  ngOnInit() {}


  openNetworkSettings() {
    if (this.platform.is('cordova')) {
      // this.network.openWifiSettings();
      this.nativeSettings.open('wifi');
    } else {
      console.log('Opening network settings is not supported on this platform.');
    }
  }
}
