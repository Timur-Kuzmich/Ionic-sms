import {Component} from '@angular/core';
import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed} from '@capacitor/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SMS} from "@ionic-native/sms/ngx";
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';

const {PushNotifications} = Plugins;

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
        private geolocation: Geolocation,
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

    ngOnInit() {
        console.log('Initializing HomePage');

        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermission().then(result => {
            if (result.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register().then(data => console.log(data));
            } else {
                // Show some error
            }
        });

        PushNotifications.addListener('registration',
            (token: PushNotificationToken) => {
                console.log('Push registration success, token: ' + token.value);
            }
        );

        PushNotifications.addListener('registrationError',
            (error: any) => {
                console.log('Error on registration: ' + JSON.stringify(error));
            }
        );

        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotification) => {
                console.log('Push received: ' + JSON.stringify(notification));
            }
        );

        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                console.log('Push action performed: ' + JSON.stringify(notification));
            }
        );
    }

    public timer(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    public async startCount() {
        for (let i: number = 0; i < 300; i++) {
            console.log(i);
            await this.timer(1000).then().catch().finally();
        }
    }

    public async viewPermissions() {
        await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
            result => {
                console.log('Has permission (SEND_SMS)?', result.hasPermission)
            },
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
        );

        await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
            result => {
                console.log('Has permission (CAMERA)?', result.hasPermission)
            },
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );

        await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
            result => {
                console.log('Has permission (INTERNET)?', result.hasPermission)
            },
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
        );
    }

    public async requestPermissions() {
        await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS, this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.INTERNET]).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    public async sendSMS() {
        await this.sms.send('+375293475186', 'I').then(() => console.log('message send'));
    }

    public async getCoords() {
        await this.geolocation.getCurrentPosition().then((resp) => {
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
            console.log(data.coords.latitude);
            console.log(data.coords.longitude);
        });
    }

    public async pushNote() {

    }
}
