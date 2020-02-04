import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { OpcionesPage } from "../opciones/opciones";
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  // templateUrl: 'popover.html',
  template: `
  <ion-list>
    <ion-list-header>Opciones</ion-list-header>
    <button ion-item (click)="presentModal()">Participantes</button>
    <button ion-item (click)="close()">Cancelar</button>    
  </ion-list>
`
})
export class PopoverPage {
  // <button ion-item (click)="close()">Showcase</button>
  // <button ion-item (click)="close()">GitHub Repo</button>
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, 
    public navParams: NavParams,public modalCtrl: ModalController) {
      document.addEventListener('backbutton', () => {
        this.viewCtrl.dismiss();
        window.localStorage.setItem('root', 'ChatPage');
    });
  }
  presentModal() {
    const modal = this.modalCtrl.create(OpcionesPage);
    modal.present();
    modal.onDidDismiss(data => {
      this.close();
    });
  }
  ionViewDidLoad() {
    window.localStorage.setItem('root', 'PopoverPage');
    console.log('ionViewDidLoad PopoverPage');
  }
  close() {
    window.localStorage.setItem('root', 'ChatPage');
    this.viewCtrl.dismiss();
  }
}
