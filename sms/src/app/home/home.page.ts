import {Component} from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private menu: MenuController) {
    }

    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    logScrollStart() {
        console.log('scroll started');
    }

    logScrolling($event: any) {
        //console.log($event.detail);
        if ($event.detail.deltaY > 0) {
            if (document.getElementsByClassName('test_header')[0].classList.contains('test_header_top')) {
                document.getElementsByClassName('test_header')[0].classList.remove('test_header_top');
            }
            //console.log('top');
        } else if ($event.detail.deltaY < 0) {
            document.getElementsByClassName('test_header')[0].classList.add('test_header_top');
            if ($event.detail.currentY === 0) {
                if (document.getElementsByClassName('test_header')[0].classList.contains('test_header_top')) {
                    document.getElementsByClassName('test_header')[0].classList.remove('test_header_top');
                }
            }
            //console.log('bot');
        }
    }
}
