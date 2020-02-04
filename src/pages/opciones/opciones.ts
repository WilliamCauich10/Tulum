import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
// provider
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-opciones',
  templateUrl: 'opciones.html',
})
export class OpcionesPage {
  personas: any[] = [];
  constructor(public userService: UserServiceProvider,public navCtrl: NavController,
     public navParams: NavParams, public viewCtrl: ViewController) {
      document.addEventListener('backbutton', () => {
          this.viewCtrl.dismiss();
      });
  }

  ionViewDidLoad() {
    window.localStorage.setItem('root', 'OpcionesPage');
    this.userService.getPersonasChat(window.localStorage.getItem('ProyectoNombre'))
    .subscribe(
      (data) => { // Success
        this.personas = data['results'];
        console.log(this.personas);
        
        // this.verAnalisis();
      },
      (error) =>{
        console.error(error);
      }
    )
    console.log('ionViewDidLoad OpcionesPage');
  }
  dismiss() {
    // let data = this.variableAct;
    this.viewCtrl.dismiss();
  }

}
