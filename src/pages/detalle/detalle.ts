import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ModalController  } from 'ionic-angular';
// provider
import { UserServiceProvider } from '../../providers/user-service/user-service';
// alerta toast
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
// browser
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
// import { FileTransfer } from '@ionic-native/file-transfer';
// form
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
  private Comentario : FormGroup;
  // variables
  hideMe =false;
  Noticias:any[];
  comentarios: any[] = [];
  anexos: any[]=[];
  variableAct ="no";
  meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  // data;
  // perfi img variable 
  foto = "https://inmonitor.red70s.net/app_medios"+window.localStorage.getItem('Url');
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
      public viewCtrl: ViewController,public navParams: NavParams,
      public modalCtrl: ModalController,private formBuilder: FormBuilder,
      public userService: UserServiceProvider, public toastCtrl: ToastController,private platform: Platform,
      private documento: DocumentViewer, private iap: InAppBrowser, private file: File
  ){
    // asignación del analisis enviado a la variable
    this.Noticias =this.navParams.get("noti");
    console.log(this.Noticias)
    // validación de form
    this.Comentario = this.formBuilder.group({
      comentario: ['', Validators.required]
    });
    document.addEventListener('backbutton', () => {
      this.viewCtrl.dismiss();
  });
  }
  // form
  logForm(){
    // let loading = this.loadingCtrl.create({content:'Por favor espere...'});
    // loading.present(); 
    this.userService.getComentar(this.Noticias['id_analisis'],window.localStorage.getItem('username'),this.Comentario.value.comentario)
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
          this.userService.getComentariosID(this.Noticias['id_analisis'])
          .subscribe(
            (data) => { // Success bottom              
                this.comentarios = data['results'];
                // loading.dismiss();
                // console.log(this.comentarios);
                // this.data = this.variableAct;
            },
            (error) =>{
              console.error(error);
            }
          )
        //
      },
      (error) =>{
        // loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error al inserter Comentario, Verifique su conexión',
          duration: 2000,
          position: 'bottom'
        });
        toast.present(toast);
        console.error(error);
      }
    )
}
  // browser
  openLink(ruta){
    console.log(ruta);
    
        // const options: DocumentViewerOptions = {
        //   title: 'My PDF'
        // }
        // let path = null;
        // if (this.platform.is('ios')) {
        //   path = this.file.documentsDirectory;
        // } else if (this.platform.is('android')) {
        //   path = this.file.dataDirectory;
        // }
        // this.iap.create("http://inmonitor.red70s.net/bc/"+ruta,"_blank");
        this.iap.create("http://inmonitor.red70s.net/medios/"+ruta,"_system");
    }
  openLink2(ruta,tipo){
      // this.iap.create("http://inmonitor.red70s.net/bc/"+ruta,tipo);
    }
 
  // // Modal ver imagen
  //  presentModalImagen(img){
  //   var url = "http://inmonitor.red70s.net/app_nal/"+img;
  //   let modal = this.modalCtrl.create(VerimgPage,{url: url});
  //   modal.present();
  // }
  // cerrar modal
  dismiss() {
  // let v ="si";
    let data = this.variableAct;
    this.viewCtrl.dismiss(data);
  }
  // Comentarios
  hide() {
    this.hideMe = !this.hideMe;
  }
//
  ionViewDidLoad() {
    window.localStorage.setItem('root', 'DetallePage');
  // // anexo
    this.userService.getAnexosID(this.Noticias['id_analisis'])
    .subscribe(
      (data) => { // Success bottom
        this.anexos = data['results'];
      },
      (error) =>{
        console.error(error);
      }
    )
  // // comentario
  this.userService.getComentariosID(this.Noticias['id_analisis'])
  .subscribe(
    (data) => { // Success bottom
        this.comentarios = data['results'];
        // console.log(this.comentarios);
    },
    (error) =>{
      console.error(error);
    }
  )
    
  }

}
