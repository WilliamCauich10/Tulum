import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,Loading,ToastController,Platform, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// form
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
// camara
import { File } from '@ionic-native/file';
// import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions, DestinationType } from '@ionic-native/camera';
// loading
import { LoadingController } from 'ionic-angular';
// provider
import { UserServiceProvider } from '../../providers/user-service/user-service';
// 
import { Base64 } from '@ionic-native/base64/ngx';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-agregareporte',
  templateUrl: 'agregareporte.html',
})
export class AgregareportePage {
  private reporte : FormGroup;
  id;
  tipo;
  imagenprueba: string = null;
  lastImage: string = null;
  loading: Loading;
  imagenUrlBlog;
  tipoVal;
  reportesResults: any[] = [];
  status;
  color;
  statusactual;
  statusInsert: any[] = [];
  statusCambio: any[] = [];
  base64img:string='';
  urlBase_img;
  variableAct ="no";
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder,public viewCtrl: ViewController,
    public loadingCtrl: LoadingController, private camera: Camera, 
    private transfer: FileTransfer,private file: File,
    private filePath: FilePath,public toastCtrl: ToastController, 
    public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,public userService: UserServiceProvider,
    private base64: Base64) {
      this.id =this.navParams.get("id");
      this.tipo = this.navParams.get("tipo");
      this.status = this.navParams.get("status");
      this.color = this.navParams.get("color"); 
      this.statusactual= this.navParams.get("statusactual");
      console.log(this.id+' t '+this.tipo);
      console.log('actual->'+this.statusactual)
      console.log(this.status+' t '+this.color);
      switch (this.tipo) {
        case 'Validado':
            this.tipoVal =1;
        break;
        case 'Proceso':
            this.tipoVal =2;
        break;
        case 'Atendido':
            this.tipoVal =3;
        break;
        default:
          break;
      }
      // 
    this.reporte = this.formBuilder.group({
      Contenido: ['', Validators.required]
    });
    window.localStorage.setItem('root', 'AgregarReporte');
    document.addEventListener('backbutton', () => {
      this.viewCtrl.dismiss();
  });
  }
  ionViewDidLoad() {
    var onSuccess = function(position) {
      window.localStorage.setItem('lat',position.coords.latitude);
      window.localStorage.setItem('long',position.coords.longitude);
      // console.log('lat: '+position.coords.latitude + ' long:' +position.coords.longitude);
    };  
    navigator.geolocation.getCurrentPosition(onSuccess);
    // console.log('lat: '+this.lat + ' long:' +this.long);
    console.log('ionViewDidLoad AgregareportePage');
    console.log(window.localStorage.getItem('lat')+''+window.localStorage.getItem('long'));
  }
  logForm(){
    this.fileName_url();    
    if (this.urlBase_img) {
      // if (this.statusactual!=null) {
        // this.uploadImage();
        this.imgbinario();
        // console.log(this.imagenUrlBlog);
        this.userService.getReportesAgregar(this.id,window.localStorage.getItem('username'),window.localStorage.getItem('Proyecto'),this.reporte.value.Contenido,this.urlBase_img,this.tipoVal,this.tipo,window.localStorage.getItem('lat'),window.localStorage.getItem('long'))
        .subscribe(
          (data) => { // Success
            this.reportesResults = data['results'];
            this.statusActualizar();
            this.variableAct ="si";
          },
          (error) =>{
            console.error(error);
          }
        )
      // }else{
      //   const alert = this.alertCtrl.create({
      //     title: 'Error',
      //     subTitle: 'Se debe de ingresar una validacion primero!',
      //     buttons: ['OK']
      //   });
      //   alert.present();
      // }
    }else{
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Por favor ingrese una imagen!',
        buttons: ['OK']
      });
      alert.present();
    }
    console.log('id ->'+this.id+' usuario ->'+window.localStorage.getItem('username')+' proyecto-> '+window.localStorage.getItem('Proyecto')+' Contenido'+this.reporte.value.Contenido);
    console.log('ruta ->'+this.imagenUrlBlog+' tipo->'+this.tipoVal+' Etiqueta ->'+this.tipo);
    // alert(+this.imagenUrlBlog);
  }
  statusActualizar(){
    if (this.statusactual==null) {
      this.userService.getStatusInsert(this.id,this.status,this.color)
        .subscribe(
          (data) => { // Success
            this.statusInsert = data['results'];
          },
          (error) =>{
            console.error(error);
          }
        )
    }else if (this.status>this.statusactual) {
      this.userService.getStatusCambio(this.id,this.status,this.color)
          .subscribe(
            (data) => { // Success
              this.statusCambio = data['results'];
            },
            (error) =>{
              console.error(error);
            }
          )
    }
    
  }
  dismiss() {
    // let v ="si";
    let data = this.variableAct;
    this.viewCtrl.dismiss(data);
  }
   // camara
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
    // 
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType : this.camera.DestinationType.DATA_URL
      // destinationType: this.camera.DestinationType.FILE_URI,
      // encodingType: this.camera.EncodingType.JPEG,
      // sourceType: sourceType,
      // saveToPhotoAlbum: false,
      // correctOrientation: true
    };     
    // this.camera.getPicture(options).then((imagePath) => {
     
    //   // let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath });
    //   // modal.present();
    //   // modal.onDidDismiss(data => {
    //   //   if (data && data.reload) {
    //   //     this.reloadImages();
    //   //   }
    //   // });
    // }, (err) => {
    //   console.log('Error: ', err);
    // });
     // Get the data of an image
    // this.camera.getPicture(options).then((imagePath) => {
    //   if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
    //     this.filePath.resolveNativePath(imagePath)
    //       .then(filePath => {
    //         let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //         let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
    //         this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    //         // this.base64img="data:image/jpeg;base64,"+ImageData; 
    //         // alert(imagePath);           
    //       });
    //   } else {
    //     var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    //     var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    //   }
    // }, (err) => {
    //   this.presentToast('Error while selecting image.');
    // });
    // 
    // 
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
    // 
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    // this.urlBase_img =n
    this.imagenUrlBlog = n;
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
  // subir imagen  
  public fileName_url() {
    var d = new Date(), n = d.getTime();
    this.urlBase_img =n+'.jpg';
  }
  public imgbinario() {
    
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

    fileTransfer2.upload(this.base64img, 'https://inmonitor.red70s.net/app_medios/app/controllers/APP/reportesImg_binario.php', options2).then(data => {
      // alert(JSON.stringify(data));
      this.loading.dismissAll();
      this.dismiss();
      this.presentToast('Image succesful uploaded.');
    }, error => {
      // alert("error");
      // alert("error" + JSON.stringify(error));
      this.loading.dismissAll();
      this.dismiss();
      this.presentToast('Error while uploading file.');
    });
  }
  public uploadImage() {
    // Destination URL
    var url = "https://inmonitor.red70s.net/app_medios/app/controllers/APP/reportesImg.php";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    const fileTransfer: FileTransferObject  = this.transfer.create();
   
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then((data) => {
      this.loading.dismissAll();
      this.dismiss();
      this.presentToast('Image succesful uploaded.');
      // alert(data);
    }, (err) => {
      this.loading.dismissAll();
      this.dismiss();
      this.presentToast('Error while uploading file.');
    });
    // 
    
    // 
  }
 

}
