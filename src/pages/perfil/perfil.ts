import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
// img
import { File } from '@ionic-native/file';
// import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { PrincipalPage } from '../principal/principal';
import { LoginPage } from '../login/login';
import { Base64 } from '@ionic-native/base64/ngx';
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  // variables
  imagenprueba: string = null;
  lastImage: string = null;
  loading: Loading;
  nombre;
  foto ;
  base64img:string='';
  urlBase_img;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,private camera: Camera, 
    private transfer: FileTransfer, private file: File, 
    private filePath: FilePath,public toastCtrl: ToastController, 
    public platform: Platform, public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,private base64: Base64) {
      if (window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username')=== null) {
        this.navCtrl.setRoot(LoginPage);
      }
      menuCtrl.enable(true);
  }
  ionViewDidLoad() {
    window.localStorage.setItem('root', 'PerfilPage');
    this.foto="https://inmonitor.red70s.net/app_nal"+window.localStorage.getItem('Url');
    this.nombre = window.localStorage.getItem('username');
    console.log(this.nombre);
    console.log('ionViewDidLoad PerfilPage');
  }
  // img code
  // menu de cargar imagen
   public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona la imagen',
      buttons: [
        {
          text: 'Cargar de Album',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camara',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null
        }
      ]
    });
    actionSheet.present();
  }
  // tomar foto
  public takePicture(sourceType) {
    var options = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType : this.camera.DestinationType.DATA_URL
    };     
    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.lastImage='mmmm';
       this.base64img = 'data:image/jpeg;base64,' + imageData;
      // alert(this.base64img)
     }, (err) => {
      // Handle error
     });
 }
//  Crear nombre de imagen imagen
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  window.localStorage.getItem('username')+ n + ".jpg";
    return newFileName;
  }
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  // alerta
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  } 
  // 
  public fileName_url() {
    // var d = new Date(), n = d.getTime();
    // this.urlBase_img =n+'.jpg';
    this.urlBase_img = window.localStorage.getItem('username')+'.jpg';
  }
  public uploadImage() {
    this.fileName_url();   

    const fileTransfer2: FileTransferObject = this.transfer.create();

    let options2= {
      fileKey: "photo",
      fileName: this.urlBase_img,
      chunkedMode: false,
      // mimeType: "image/jpeg",
      headers: {}
    }

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    fileTransfer2.upload(this.base64img, 'https://inmonitor.red70s.net/app_nal/app/controllers/APP/perfil_binario.php', options2).then(data => {
      // alert(JSON.stringify(data));
      this.loading.dismissAll();
      // this.Limpiar_cache();
      this.presentToast('Image succesful uploaded.');
    }, error => {
      // alert("error");
      // alert("error" + JSON.stringify(error));
      this.loading.dismissAll();
      // this.Limpiar_cache();
      this.presentToast('Error while uploading file.');
    });
}
//
  Limpiar_cache(){
    this.navCtrl.push(PrincipalPage)
    // this.navCtrl.popToRoot();
    // const loader = this.loadingCtrl.create({
    //   content: "Aplicando cambios...",
    //   duration: 3000
    // });
    // loader.present();
    // setTimeout(() => {
    //   window.location.reload(true);
    //   const loader = this.loadingCtrl.create({
    //       content: "Aplicando cambios...",
    //       duration: 500
    //     });
    //     loader.present();
    // }, 500);
  }
   //Menu
  openMenu() {
    this.menuCtrl.open();
  }
  closeMenu() {
    this.menuCtrl.close();
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
