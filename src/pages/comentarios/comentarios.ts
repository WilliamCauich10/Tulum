import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
// provider
import { UserServiceProvider } from '../../providers/user-service/user-service';
// form
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
// alerta toast
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {
  comentarios: any[] = [];
  private Comentario : FormGroup;
  id;
  variableAct ="no";
  meses=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
   // perfi img
  foto = "http://inmonitor.red70s.net/app_sinaloa"+window.localStorage.getItem('Url');
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public userService: UserServiceProvider) {
      // usuario
      this.id =this.navParams.get("id");
      // form validacion
      this.Comentario = this.formBuilder.group({
        comentario: ['', Validators.required]
      });
      document.addEventListener('backbutton', () => {
        this.viewCtrl.dismiss();
    });
  }
  // form 
  logForm(){
    this.userService.getComentar(this.id,window.localStorage.getItem('username'),this.Comentario.value.comentario)
    .subscribe(
      (data) => { // Success bottom
        let toast = this.toastCtrl.create({
          message: 'Comentario agregado',
          duration: 2000,
          position: 'bottom'
        });
        toast.present(toast);
        this.Comentario.reset()
        this.variableAct ="si";
        // comentario
          this.userService.getComentariosID(this.id)
          .subscribe(
            (data) => { // Success bottom
                this.comentarios = data['results'];
                // console.log(this.comentarios);
            },
            (error) =>{
              console.error(error);
            }
          )
      },
      (error) =>{
        console.error(error);
      }
    )
}
  ionViewDidLoad() {
    window.localStorage.setItem('root', 'ComentariosPage');
     // comentario
     this.userService.getComentariosID(this.id)
     .subscribe(
       (data) => { // Success bottom
           this.comentarios = data['results'];
       },
       (error) =>{
         console.error(error);
       }
     )
    console.log('ionViewDidLoad ComentariosPage');
  }
  dismiss() {
    let data = this.variableAct;
    this.viewCtrl.dismiss(data);
  }
  // ionViewWillLeave(){
  //   console.log("sALIR2")
  //   this.variableAct= "si";
  //   let data = this.variableAct;
  //     this.viewCtrl.dismiss(this.variableAct);
  //     // this.viewCtrl.onDidDismiss(data=>{'si'});
  // }
   
}
