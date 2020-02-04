import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
// page
import { AgregareportePage } from "../agregareporte/agregareporte";
// provider
import { UserServiceProvider } from '../../providers/user-service/user-service';
@IonicPage()
@Component({
  selector: 'page-validaciones',
  templateUrl: 'validaciones.html',
})
export class ValidacionesPage {
  pet: string = "Validado";
  agreagarV:boolean =true;
  agreagarP:boolean =false;
  agreagarA:boolean =false;
  id;
  status;
  color="rojo1";
  reportesResults: any[] = [];
  statusInsert: any[] = [];
  statusCambio: any[] = [];
  StatusResults: any[] = [];
  Sta=0;
  colorSta='';
  variableAct ="no";
  meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  foto= window.localStorage.getItem('Url');
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,public viewCtrl: ViewController,
    public userService: UserServiceProvider) {
    this.id =this.navParams.get("id");
    this.status =this.navParams.get("status");
    console.log(this.id+' '+this.status);
    document.addEventListener('backbutton', () => {
      this.viewCtrl.dismiss();
  });
  
  }

  ionViewDidLoad() {
    window.localStorage.setItem('root', 'ValidacionesPage');
    var onSuccess = function(position) {
      window.localStorage.setItem('lat',position.coords.latitude);
      window.localStorage.setItem('long',position.coords.longitude);
      // console.log('lat: '+position.coords.latitude + ' long:' +position.coords.longitude);
    };  
    navigator.geolocation.getCurrentPosition(onSuccess);
    if (this.status==null) {
      this.Sta=1; this.colorSta='warning';
      // console.log('status 1')
    }
    if (this.status==1) {
      this.Sta=1; this.colorSta='warning';
    }  
    if (this.pet=='Validado') {
      this.consultaReportes(1);      
    }
    if (this.pet=='Proceso') {
      this.consultaReportes(2);
    }
    if (this.pet=='Atendido') {
      this.consultaReportes(3);
    }
    console.log('ionViewDidLoad ValidacionesPage');
  }
  agregar(tipo,idA){
    let modal = this.modalCtrl.create(AgregareportePage,{id: idA,tipo: tipo,status: this.Sta,color:this.colorSta,statusactual:this.status});
    modal.onDidDismiss(data => {
      if (data == 'si') {
        this.variableAct ="si";
        this.actualizaStatusG();
        this.ionViewDidLoad();
      }else{
        this.variableAct ="no";
      }
     });
    modal.present();
    console.log(tipo+' '+idA);
  }
  consultaReportes(tipo){
    this.userService.getReportes(tipo, this.id)
      .subscribe(
        (data) => { // Success
          this.reportesResults = data['results'];
          console.log(this.reportesResults);
        },
        (error) =>{
          console.error(error);
        }
      )
  }
  cambioSegment(tipo){
    // var Sta=0,colorSta='';
    switch (tipo) {
      case 'Validado':
        this.agreagarV=true;
        this.agreagarP=false;
        this.agreagarA=false;
        // if (this.status==null) {
          console.log('cambiar 1');
          this.Sta=1; this.colorSta='warning';
        // }
        this.consultaReportes(1);
      break;
      case 'Proceso':
        this.agreagarV=false;
        this.agreagarP=true;
        this.agreagarA=false;
        // if (this.status==1) {
          console.log('cambiar 2');
          this.Sta=2; this.colorSta='caution';
        // }
        this.consultaReportes(2);
      break;
      case 'Atendido':
        this.agreagarV=false;
        this.agreagarP=false;
        this.agreagarA=true;
        // if (this.status==2) {
          console.log('cambiar 3');
          this.Sta=3; this.colorSta='primary';
        // }
        this.consultaReportes(3);
      break;
  
      default:
        break;
    }
    console.log(tipo);
  }

  dismiss() {
    // let v ="si";
    // let data = 'si';
    let data = this.variableAct;
    this.viewCtrl.dismiss(data);
  }
  actualizaStatusG(){
    this.userService.getStatusGet(this.id)
    .subscribe(
      (data) => { // Success
        this.StatusResults = data['results'];
        for (var re of this.StatusResults) {
          this.status = re.Status;
          console.log(re.Status);
        }
      },
      (error) =>{
        console.error(error);
      }
    )
  }

}
