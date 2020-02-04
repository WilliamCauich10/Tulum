import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, 
  NavParams,ViewController,ActionSheetController,
  ToastController,Platform,LoadingController, Loading,
  AlertController 
} from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var google;
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-eventosde',
  templateUrl: 'eventosde.html',
})
export class EventosdePage {
  id;
  EventosAgenda: any[] = [];
  GaleriaAgenda: any[] = [];
  map: any;
  BusqTipo: string = "";
  lastImage: string = null;
  loading: Loading;
  btnCamara = false;
  actualiza='no';
  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UserServiceProvider,
    public viewCtrl: ViewController, public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,private camera: Camera, private transfer: FileTransfer, 
    private file: File, private filePath: FilePath,) {
    this.id =this.navParams.get("id");
    window.localStorage.setItem('root', 'AgendaDetallePage');
    document.addEventListener('backbutton', () => {
      // this.viewCtrl.dismiss();
      // this.dismiss();
  });
  }
//   Borrar(id){
//     let alert = this.alertCtrl.create({
//       title: 'Eliminar',
//       message: '¿Estas Seguro de eliminar de la galeria?',
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel',
//           handler: () => {
//           }
//         },
//         {
//           text: 'Borrar',
//           handler: () => {
//             this.userService.getGaleriaBorrar(id)
//               .subscribe(
//                 (data) => { // Success    
//                     // actualizar la galeria
//                     this.galeriaServer();
//                 },
//                 (error) =>{
//                   console.error(error);
//                 }
//               )  
//             // console.log(id)
//           }
//         }
//       ]
//     });
//     alert.present(); 
//     // console.log(id)
//   }
//   ionViewDidLoad() {
//     var lat;
//     var lng;
//     this.userService.getEventId(this.id)
//     .subscribe(
//       (data) => { // Success
//         this.EventosAgenda = data['results'];
//         console.log(this.EventosAgenda);
//         for (let index = 0; index < this.EventosAgenda.length; index++) {
//           lat = this.EventosAgenda[index]['Lat'];
//           lng = this.EventosAgenda[index]['Lng'];
//           this.BusqTipo = this.EventosAgenda[index]['Status'];
//         }
//         if (this.BusqTipo=='Realizado') {
//           this.btnCamara = true;
//         }
//         this.loadMap(lat,lng); 
//       },
//       (error) =>{
//         console.error(error);
//       }
//     )  
//    this.galeriaServer();
//     // this.loadMap();    
//     console.log('ionViewDidLoad EventosdePage');
//   }
//   galeriaServer(){
//      // galeria
//      this.userService.getGaleria(this.id)
//      .subscribe(
//        (data) => { // Success
//          this.GaleriaAgenda = data['results'];       
//        },
//        (error) =>{
//          console.error(error);
//        }
//      )  
//   }  
//   loadMap(lat,lng){

//     let latLng = new google.maps.LatLng(lat, lng);

//     let mapOptions = {
//       center: latLng,
//       zoom: 15,
//       // mapTypeId: google.maps.MapTypeId.HYBRID,
      
//       fullscreenControl: false
//     }
//     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
//     // 
//     this.addMarker(latLng);
//   }
//   addMarker(latLng){
//     let marker;
//     marker = new google.maps.Marker({
//     // let marker = new google.maps.Marker({
//       map: this.map,
//       animation: google.maps.Animation.DROP,
//       position: latLng,
//       // icon: {
//       //   url: icono
//       // } 
//     });
//     var evento ='(click)="Detalle()"';
//     let content = "<h4>holis</h4>";          
//     this.addInfoWindow(marker, content);
  
//   }
//   addInfoWindow(marker, content){

//     let infoWindow = new google.maps.InfoWindow({
//       content: content
//     });

//     google.maps.event.addListener(marker, 'click', () => {
//       // this.Detalle(cantidad,id_hotel,hotel);
//     });
//   }
//   dismiss() {    
//     let data =this.actualiza;
//       // let data = this.variableAct;
//       this.viewCtrl.dismiss(data);
//   }
//   Cambio(tipo){
//     if (tipo=='Realizado') {
//       this.btnCamara = true;
//     }else{
//       this.btnCamara = false;
//     }
//     let loading = this.loadingCtrl.create({content:'Por favor espere...'});
//     loading.present(); 
//     this.userService.getStatusAc(this.id,tipo)
//      .subscribe(
//        (data) => { // Success
//         this.actualiza='si';
//         loading.dismiss();
//        },
//        (error) =>{
//           // loading.dismiss();
//           setTimeout(()=>{
//             loading.dismiss();
//             let alert = this.alertCtrl.create({
//               title: 'Error',
//               subTitle: 'Verifique su conexion a internet, esta tardando mas de lo necesario',
//               buttons: ['Aceptar']
//             });
//             alert.present();
//           },5000);
//          console.error(error);
//        }
//      )  
//   }
//   // Fotos
//   public presentActionSheet() {
//     let actionSheet = this.actionSheetCtrl.create({
//       title: 'Selecciona la imagen',
//       buttons: [
//         {
//           text: 'Cargar de Album',
//           icon: !this.platform.is('ios') ? 'images' : null,
//           handler: () => {
//             this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
//           }
//         },
//         {
//           text: 'Usar Camara',
//           icon: !this.platform.is('ios') ? 'camera' : null,
//           handler: () => {
//             this.takePicture(this.camera.PictureSourceType.CAMERA);
//           }
//         },
//         {
//           text: 'Cancel',
//           role: 'cancel',
//           icon: !this.platform.is('ios') ? 'close' : null
//         }
//       ]
//     });
//     actionSheet.present();    
//   }
//   public takePicture(sourceType) {
//     // Create options for the Camera Dialog
//     var options = {
//       quality: 50,
//       sourceType: sourceType,
//       saveToPhotoAlbum: false,
//       correctOrientation: true
//     };
   
//     // Get the data of an image
//     this.camera.getPicture(options).then((imagePath) => {
//       // Special handling for Android library
//       if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
//         this.filePath.resolveNativePath(imagePath)
//           .then(filePath => {
//             let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
//             let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
//             this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//           });
//       } else {
//         var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
//         var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
//         this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//       }
//     }, (err) => {
//       this.presentToast('Error while selecting image.');
//     });
//   }
//   // Create a new name for the image
// private createFileName() {
//   var d = new Date(),
//   n = d.getTime(),
//   newFileName =  n + ".jpg";
//   return newFileName;
// }
 
// // Copy the image to a local folder
// private copyFileToLocalDir(namePath, currentName, newFileName) {
//   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
//     this.lastImage = newFileName;
//     this.uploadImage();
//   }, error => {
//     this.presentToast('Error while storing file.');
//   });
// }
 
// private presentToast(text) {
//   let toast = this.toastCtrl.create({
//     message: text,
//     duration: 3000,
//     position: 'top'
//   });
//   toast.present();
// }
 
// // Always get the accurate path to your apps folder
// public pathForImage(img) {
//   if (img === null) {
//     return '';
//   } else {
//     return cordova.file.dataDirectory + img;
//   }
// }

// public uploadImage() {
//   // Destination URL
//   var url = "http://inmonitor.red70s.net/agenda_sinaloa/movil/imagenes.php";
 
//   // File for Upload
//   var targetPath = this.pathForImage(this.lastImage);
 
//   // File name only
//   var filename = this.lastImage;
 
//   var options = {
//     fileKey: "file",
//     fileName: filename,
//     chunkedMode: false,
//     mimeType: "multipart/form-data",
//     params : {'fileName': filename}
//   };
 
//   const fileTransfer: FileTransferObject = this.transfer.create();
 
//   this.loading = this.loadingCtrl.create({
//     content: 'Uploading...',
//   });
//   this.loading.present();
 
//   // Use the FileTransfer to upload the image
//   fileTransfer.upload(targetPath, url, options).then(data => {
//     this.loading.dismissAll()
//     this.presentToast('Image succesful uploaded.');  
//     // guardar la ruta en la bd
//     this.userService.getGaleriaDB(this.id,filename)
//     .subscribe(
//       (data) => { // Success    
//           // actualizar la galeria
//           this.galeriaServer();
//       },
//       (error) =>{
//         console.error(error);
//       }
//     )  
//   }, err => {
//     this.loading.dismissAll()
//     this.presentToast('Error while uploading file.');
//   });

//   // guardar la ruta en la bd
//   this.userService.getGaleriaDB(this.id,filename)
//   .subscribe(
//     (data) => { // Success    
//         // actualizar la galeria
//         this.galeriaServer();
//     },
//     (error) =>{
//       console.error(error);
//     }
//   )  
//   // filename
// }

}
