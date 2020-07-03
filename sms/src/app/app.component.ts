import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SMS } from "@ionic-native/sms/ngx";
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sms: SMS,
    private backgroundMode: BackgroundMode,
    private androidPermissions: AndroidPermissions,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backgroundMode.enable();
    });
  }
  
  ////////////////////

  public timer(ms) {
      return new Promise(res => setTimeout(res, ms));
  }

  public async startCount () {
    for (let i: number = 0; i < 300; i++) {
      console.log(i);
      await this.timer(1000).then().catch().finally();
    }
  }
  
  public async viewPermissions(){
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
        result => {console.log('Has permission (SEND_SMS)?',result.hasPermission)},
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
    );
    
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => {console.log('Has permission (CAMERA)?',result.hasPermission)},
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
        result => {console.log('Has permission (INTERNET)?',result.hasPermission)},
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
    );
  } 
  
  public async requestPermissions(){
      await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS, this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.INTERNET]).then(data => {
          console.log(data);
      }).catch(error => {
          console.log(error);
      });
  }
  
  public async sendSMS(){
    await this.sms.send('+375293475186','I').then(() => console.log('message send'));
  }
}
