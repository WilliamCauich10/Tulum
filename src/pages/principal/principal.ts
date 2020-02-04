import { Component, ViewChild } from '@angular/core';
import { IonicPage,Platform,AlertController, NavController, NavParams, MenuController,App,ModalController, Slides, Segment, SegmentButton   } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
// modal
import { DetallePage } from '../detalle/detalle';
// paginas
import { ComentariosPage } from "../comentarios/comentarios";
import { ValidacionesPage } from "../validaciones/validaciones";
// provider
import { UserServiceProvider } from '../../providers/user-service/user-service';
//actualizar
import { Refresher }  from "ionic-angular";
// notif
// import { Push, PushObject, PushOptions } from '@ionic-native/push';
// form
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
// 
import { LoadingController } from 'ionic-angular';
// 
import {Content} from 'ionic-angular';
// 
// import * as firebase from "firebase";
// 
import { Events } from 'ionic-angular';
// import { AppMinimize } from '@ionic-native/app-minimize';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})

export class PrincipalPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  @ViewChild(SegmentButton) segmentE: SegmentButton;
  // imagen perfil
  foto ;
  fechaTemasBusqueda;
  fechaTemasBusqueda2;
  // Fecha
  date: Date = new Date();
  ionicDate = new Date(Date.UTC(this.date.getUTCFullYear(),this.date.getUTCMonth(), this.date.getUTCDate()));
  fecha = new Date(Date.UTC(this.date.getUTCFullYear(),this.date.getUTCMonth(), this.date.getDate())).toISOString();
  fecha2 =new Date(Date.UTC(this.date.getUTCFullYear(),this.date.getUTCMonth(), this.date.getDate())).toISOString();
  Dia= this.fecha;
  mes=this.fecha;
  FechaMostrar;
  temasABuscar;
  noValid;
  totalAvances;
  noValidBusq;
  totalAvancesBusq;
  meses=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  MostrarFecha =false;
  fechaLabel;
  TipoPT: string ="";
  BusqTipo: string = "";
  TemasBusqueda: string = "";
  TipoDeBusqueda;
  tablaeventos=false;
  public event = {
    Actual: this.fecha
  }
  Exacta:boolean =false;
  Rango:boolean =false;
  boolPalabra:boolean =false;
  boolTema:boolean =false;
  temasBusquedaBool:boolean = false;
  public eventBusqeda = {
    time: this.fecha,
    timeStarts: this.fecha,
    timeEnds: this.fecha
  }
  ocultar1: boolean = false;
  items;
  items2;
  //variables array
  users: any[] = [];
  notas: any[] = [];
  FiltroTemas: any[]= [];
  comentarios: any[] = [];
  GraficaProvider: any[] = [];
  GraficaProviderBusq: any[] = [];
  top5: any[] = [];
  StatusTabla: any[]=[];
  StatusTablaBusq: any[]=[];
  Articulos:any []=[];
  Articulos2:any []=[];
  ResultdoBusquda: any[] = [];
  artTotal=0;
  artTotalbusqueda=0;
  nombre;
  notifi: boolean = false;
  vibracion: boolean = true;
  vibracionnotificacion: boolean = false;
  rst: boolean = false;
  rst2: boolean = false;
  rst3: boolean = false;
  topmostrar: boolean=true;
  contador=0;
  bandera = false;
  //
  pet: string = "Noticias";
  limpiarV: boolean = false;
  // grafica
  pieChartData; 
  pieChartData2; 
  datos2=[['Temas', 'ss',{ role: 'annotation' }]];
  datos2Bus=[['Temas', 'ss',{ role: 'annotation' }]];
  datos3;
  datos3Bus;
  BarChart;
  Barchart2;
  TablaGeo: any [] = [];
  TablaGeoBus: any [] = [];
  GeoTotal=0;
  GeoTotalBusq=0;
  cprincipal='#06A4CA';
  cosecundario='#0DBBBA';
  csegmento='#FFC000';
  itemList;
  itemList2;
  totalM=0;
  SegemtWidth: any
  SegmentoEstados: string = "";
  SegmentoEstadosDisplay = true;
  Segmento_Actual="";
  // rioTypes = ['ABC', 'XYZ', 'PQR'];
  segmento;  
  private fomrbusqueda : FormGroup;
  
  // 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,public app: App,
    public menuCtrl: MenuController,public modalCtrl: ModalController,
    public userService: UserServiceProvider, public platform: Platform,
    public events: Events,private formBuilder: FormBuilder,
    public alertCtrl: AlertController,public loadingCtrl: LoadingController,
    public toastCtrl: ToastController    
   ) {
    this.vibracion=true;
    events.subscribe('usuario: salir', () => {
      this.loguout();
    });     
      if (window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username')=== null) {
        this.navCtrl.setRoot(LoginPage);
      }
      this.fomrbusqueda = this.formBuilder.group({
        Palabras: ['', Validators.required],
        // BusqTipo:['',Validators.required]
      });    
      // this.consulta();
      this.initializeItems();
      menuCtrl.enable(true);
      this.notificacion();
      events.subscribe('cargar:principal', () => {
        this.ionViewWillEnter();
      });
      events.subscribe('Principal: Fecha', () => {        
        this.CambioFecha(window.localStorage.getItem('FechaNot'));
      });    
      // this.CambioFecha('2019-10-10');
      // console.log(this.prueba.results[0]['nom_geo']);
      // this.SegmentoEstados="NACIONAL";
  }
  // 
  selectedSegment(Seg) {
    // console.log(d);
    this.SegmentoEstados=Seg;
    // this.content.resize();
    this.content.scrollToTop();
  }
  // 
  ionViewDidEnter() { 
    this.vibracion=true;
  }
  ionViewDidLoad(){
    // this.itemList2=[];
    // let tot=0;
    //   var messagesRef = firebase.database().ref(window.localStorage.getItem('ProyectoNombre')).child("mensajes");
    //   messagesRef.once('value', itemList => {
    //     itemList.forEach( item => {
    //       this.itemList2.push(item.val());            
    //       return false;
    //     });
    //     tot=this.itemList2.length;
    //     // console.log("vibracion-> "+ tot)  
    //     messagesRef.on("value",(snap)=>{
    //       var data = snap.val();
    //       this.itemList=[];    
    //         for (var key in data) {
    //         this.itemList.push(data[key]);
    //         }
    //         if (this.itemList.length > tot && this.vibracion==true) {
    //           this.vibracionnotificacion =true;
    //           this.events.publish('chat:total');
    //           // console.log("vibracion->> "+ tot)
    //           tot =this.itemList.length;
    //           const toast = this.toastCtrl.create({
    //             message:  this.itemList[tot-1]['usuario']+': \n'+this.itemList[tot-1]['mensaje'],
    //             position: 'top',
    //             duration: 3000
    //           });
    //           toast.present();
    //         // console.log("vibracion->< "+ this.itemList[tot-1]['mensaje'])        
    //       }else{
    //         this.vibracionnotificacion =false;
    //       }
    //     });       
    //   });
  }
  ionViewDidLeave(){
    this.vibracion=false;
  }
  loguout(){
    this.navCtrl.setRoot(LoginPage);
    // console.log('salir');    
  }
  notificacion(){
  //   const options: PushOptions = {
  //     android: {
  //       senderID: '255572746692'
  //     },
  //     ios: {
  //         alert: 'true',
  //         badge: true,
  //         sound: 'false'
  //     }
  //  };
  //   const pushObject: PushObject = this.push.init(options);
  //   pushObject.on('notification').subscribe((notification: any) =>    {
  //     // console.log(notification);
  //     this.notificacion_Alerta();
  //   });
  }
  notificacion_Alerta(){
    if (this.vibracionnotificacion==false) {
      document.getElementById('notifi').click();
    } else {   
      navigator.vibrate(1000)
      this.vibracionnotificacion =false;
    }    
    // console.log('Received a notification desde principal');
  }
  notificaion(){
    this.notifi = true;
  }
  // searchbar
  accion1() {
   this.ocultar1 = !this.ocultar1;
  }
  initializeItems() {
   this.items = this.users;
  }
  getItems(ev) {
    // restablecer
    this.initializeItems();
    // tomar el valor
    var val = ev.target.value;
    // si el valor esta vacio
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.tit_analisis.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
 // modal detalle
  presentModal(noticia:any) {
    let modal = this.modalCtrl.create(DetallePage,{noti: noticia});
    modal.onDidDismiss(data => {
      this.rst3=false;
      // this.ionViewWillEnter();
      // this.consulta();
      if (data == 'si') {
        this.consulta();      
      }else{
        console.log(data);
      }
      // this.content.resize();
      // this.content.scrollToTop();
    }); 
    modal.present();
  }
//  modal Status
  presentModalComentario(id,status) {
    let modal = this.modalCtrl.create(ValidacionesPage,{id: id,status:status});
    modal.onDidDismiss(data => {
      this.rst3=false;
      if (data == 'si') {
        this.consulta();      
      }else{
        console.log(data);
      }
    });  
    modal.present();
  }

  //  modal comentarios
  presentModalComent(id) {
    let modal = this.modalCtrl.create(ComentariosPage,{id: id});
      modal.onDidDismiss(data => {
        this.rst3=false;
        if (data == 'si') {
          this.consulta();          
        }else{
          console.log(data);
        }
      });  
    modal.present();
    
  }
    // Fecha
  ver() {
    this.MostrarFecha = !this.MostrarFecha;
  }
  CambioFecha(fecha){
    if(window.localStorage.getItem('Internet') === "false"){
      // loading.dismiss();
      // loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'No esta conectado a internet',
            buttons: ['Aceptar']
          });
          // alert.present();
    }
    // console.log(fecha)
    if (this.topmostrar) {
      this.slides.slideTo(0,1);      
    }else{
      this.topmostrar=true;
      this.content.resize();
    }
    this.fecha=fecha;
    this.Dia=fecha;
    this.mes=fecha;
    this.MostrarFecha = false;
    this.rst=true;
    this.rst3=true;
    this.SegmentoEstadosDisplay=true;
    window.localStorage.removeItem('FechaNot');
    this.ionViewWillEnter();
  }
  //
  bajar(tipo){
    if (this.pet=='Grafica') {
      this.topmostrar=false;
      this.content.resize();
      this.content.scrollToTop();
      this.tablaeventos=true;
      this.SegmentoEstadosDisplay=false;
    }else{
      this.tablaeventos=false;
    }
    if (this.pet=='Noticias') {
      this.topmostrar=true;
      this.content.resize();
      this.content.scrollToTop();
      this.SegmentoEstadosDisplay=true;
    }
    if (this.pet=='Busqueda2'){
      this.topmostrar=false;
      this.SegmentoEstadosDisplay=false;
      this.content.resize();
      this.content.scrollToTop();
    }
  }
  ionViewWillEnter() {
    // let loading = this.loadingCtrl.create({content:'Por favor espere...'});
    // loading.present(); 
    // 
    // this.userService.getSegment(window.localStorage.getItem('IDU'),window.localStorage.getItem('Tipo'),this.fecha.substring(0,10))
    // .subscribe(
    //   (data) => { // Success
    //     this.segmento = data['results'];
    //     console.log(this.segmento);
    //     // this.rst3=true;
    //     if(this.segmento.length>0 && this.rst3 ==true ){
    //       this.SegmentoEstados = this.segmento[this.segmento.length-1]['nom_geo'];
    // //       // console.log(this.segmento[0]['nom_geo']);
    //     }
    //     if (this.segmento.length == 1) {
    //       this.SegemtWidth = '100%';
    //     }else if(this.segmento.length == 2){
    //       this.SegemtWidth = '50%';
    //     }else{
    //       this.SegemtWidth = '34%';
    //     }
    //     // this.consulta();
    //     // loading.dismiss();
    //     //     // this.verAnalisis();
    //   },
    //   (error) =>{
    //     setTimeout(()=>{
    //       window.localStorage.setItem('Internet', 'false');
    //       // loading.dismiss();
    //       let alert = this.alertCtrl.create({
    //         title: 'Error',
    //         subTitle: 'Verifique su conexion a internet, esta tardando mas de lo necesario',
    //         buttons: ['Aceptar']
    //       });
    //       // alert.present();
    //       window.localStorage.setItem('Internet', 'true');
    //     },5000);
    //     console.error(error);
    //   }
    // )
    this.consulta();
    // 
    window.localStorage.setItem('root', 'PrincipalPage');
    if (window.localStorage.getItem('FechaNot') === "undefined" || window.localStorage.getItem('FechaNot') === null) {
      if(this.rst ==true){
        this.fecha=this.fecha;
        // this.event.Actual=this.fecha;
      }else{
        this.fecha=this.fecha2;
        this.event.Actual=this.fecha2;
      }
    }else{
      this.fecha=window.localStorage.getItem('FechaNot');
      this.event.Actual =window.localStorage.getItem('FechaNot');
      window.localStorage.removeItem('FechaNot');
    }
    this.vibracion=true;
    // console.log("actualizar");
    this.foto="https://inmonitor.red70s.net/app_medios"+window.localStorage.getItem('Url');
    this.datos2=[['Temas', 'Escenario Temático',{ role: 'style' },{ role: 'annotation' }]];
    this.datos3=[['Temas', 'Escenario Temático']];
    this.datos3.push(['Validado',0],['En proceso',0],['Atendido',0],['Eventos',0]);
    
    if (this.pet=='Busqueda2' && this.rst3==false) {
      this.pet = "Busqueda2";
      // console.log('if1')
    }else{
      this.pet = "Noticias";    
    }
    if (this.pet=='Noticias' && this.rst3==true) {
      // console.log('if2')
      // this.content.resize();
      this.content.scrollToTop();
    }
    this.artTotal=0;
    this.Dia=this.fecha.substring(8,10);
    this.mes=this.fecha.substring(5,7);
    this.FechaMostrar = this.Dia+'/'+this.meses[parseInt(this.mes)-1];
    this.nombre = window.localStorage.getItem('Nombre');
    // Top5
    // let loading = this.loadingCtrl.create({content:'Por favor espere...'});
    // loading.present(); 
    this.userService.getTopT(this.fecha.substring(0,10),window.localStorage.getItem('Tipo'),window.localStorage.getItem('Llaves'),window.localStorage.getItem('Proyecto'))
    .subscribe(
      (data) => { // Success
        this.top5 = data['results'];
        // this.verAnalisis();
        // loading.dismiss();
      },
      (error) =>{
        // setTimeout(()=>{
        //         window.localStorage.setItem('Internet', 'false');
        //         // loading.dismiss();
        //         let alert = this.alertCtrl.create({
        //           title: 'Error',
        //           subTitle: 'Verifique su conexion a internet, esta tardando mas de lo necesario',
        //           buttons: ['Aceptar']
        //         });
        //         // alert.present();
        //         window.localStorage.setItem('Internet', 'true');
        //       },5000);
        console.error(error);
      }
    )
  //   // Grafica Provider 100 = 45 *2, + 10
    this.userService.getGrafica(this.fecha.substring(0,10),window.localStorage.getItem('Tipo'),window.localStorage.getItem('Llaves'))
    .subscribe(
      (data) => { // Success
        this.GraficaProvider = data['results'];
        for (var re of this.GraficaProvider) {
          this.datos2.push([re.id_tema_analisis_desc,parseInt(re.total),'#06A4CA',re.total]);
        } 
        var theigth =(this.GraficaProvider.length * 70)+10;
        // console.log('grafica total heigth'+theigth);
        this.BarChart ={
          chartType: 'BarChart',
          dataTable: this.datos2,
          options: { fontSize: 15,chartArea: {width: '60%', height:'70%', left: '35%'},legend: 'none', height: theigth},
        };       
      },
      (error) =>{
        console.error(error);
      }
    )
  //   // tablaGeo
    this.GeoTotal=0;
    this.userService.getTablaGeo(this.fecha.substring(0,10),window.localStorage.getItem('Tipo'),window.localStorage.getItem('Llaves'))
    .subscribe(
      (data) => { // Success
        this.TablaGeo = data['results'];
        for (var re of this.TablaGeo) {
          this.GeoTotal = this.GeoTotal + parseInt(re.total);
        }
        this.datos3[4]=['Eventos',this.GeoTotal];
        // this.datos3.push(['Eventos',this.GeoTotal],['Validado',0],['En proceso',0],['Atendido',0]);
      },
      (error) =>{
        console.error(error);
      }
    )
  //   // tabla2
    this.userService.getTabla2(this.fecha.substring(0,10),window.localStorage.getItem('Tipo'),window.localStorage.getItem('Llaves'))
    .subscribe(
      (data) => { // Success
        this.Articulos = data['results'];
        for (var re of this.Articulos) {
          this.artTotal = this.artTotal + parseInt(re.Articulos);
        }
      },
      (error) =>{
        console.error(error);
      }
    )
  //   //     
    this.userService.getStatusTabla(window.localStorage.getItem('Proyecto'),this.fecha.substring(0,10),window.localStorage.getItem('Tipo'),window.localStorage.getItem('Llaves'))
    .subscribe(
      (data) => { // Success
        this.StatusTabla = data['results'];
        // console.log(this.StatusTabla);
        // if (this.StatusTabla.length>0){
          for (var re of this.StatusTabla) {
            this.datos3[re.Status]=[re.nombre,parseInt(re.total)];
          // }
        }
        var eventosTotales = this.datos3[1][1]+this.datos3[2][1]+this.datos3[3][1];
        var eve = parseInt(this.datos3[4][1]) - eventosTotales;
        if (eve<0) {
          eve =0;
        }
        this.noValid =eve;
        this.totalAvances = eventosTotales + eve;
        // console.log(this.noValid); 
        // console.log(this.totalAvances);
        this.datos3[4] =['Eventos',eve];
        this.pieChartData =  {
          chartType: 'PieChart',
          dataTable: this.datos3,
          options: {fontSize: 15,chartArea: {width: '100%',height: '80%'},colors: ['#F1EE21', '#F16D21', '#488aff','#DCDCDC'],pieSliceTextStyle:{color:'black'}},
        };
      },
      (error) =>{
        console.error(error);
      }
    )
    // cerrar menu
    this.closeMenu();
    // noticias completas
    // this.consulta();
    // console.log(this.users);
    
    // this.CambioFecha('2019-10-10');
    
  }
  // analisis restaurado(busqueda)
  consulta(){   
    this.users =[];
    this.userService.getNotas(window.localStorage.getItem('IDU'),window.localStorage.getItem('Tipo'),this.fecha.substring(0,10))
    .subscribe(
      (data) => { // Success
        this.users = data['results'];        
        var i=0;
        // if(this.users.length>0 ){
        //   // if (this.rst3 ==true) {
        // //     // var ns=this.users[0]['nom_geo'].toString();
        // //     // document.getElementById(ns).click();
        // //     // this.segmentE.ionSelect.
        //     // console.log(this.segmentE.ionSelect);
        // //     // console.log(this.segmentE.ionSelect[this.users[0]['nom_geo']]);
        //     // this.SegmentoEstados=this.users[0]['nom_geo'];            
        //   // }
        // }else{
        //   this.SegmentoEstadosDisplay=false;
        // }
        // console.log(this.users[0]['nom_geo']);           
        // return this.users;
        // this.content.scrollToTop();
        // console.log(this.users);
      },
      (error) =>{
        // setTimeout(()=>{
        //         window.localStorage.setItem('Internet', 'false');
        //         loading.dismiss();
        //         let alert = this.alertCtrl.create({
        //           title: 'Error',
        //           subTitle: 'Verifique su conexion a internet, esta tardando mas de lo necesario',
        //           buttons: ['Aceptar']
        //         });
        //         // alert.present();
        //         window.localStorage.setItem('Internet', 'true');
        //       },5000);
        console.error(error);
      }
    )
    this.Segmento_Actual = this.SegmentoEstados;
    console.log(this.SegmentoEstados);
  }
  // actualizar
  recargar( refresher:Refresher ){
    // console.log("Inicio del refresh");
    setTimeout( ()=>{
      // console.log("Termino el refresh");
      this.ionViewWillEnter();
      this.notifi=false;
      refresher.complete();
    },1500)
    
  }
  actualizar(refresher:Refresher){
    // console.log("Inicio del refresh");
    this.fecha= new Date(Date.UTC(this.date.getUTCFullYear(),this.date.getUTCMonth(), this.date.getDate())).toISOString();
    this.ionViewWillEnter();
    this.notifi=false;
    // console.log("Termino el refresh");
  }
  // subir scroll
  scroll(tipo){
    this.pet = tipo;
  }
  // color random
  getRandomColor(){
    var color = "#";
    for (var i = 0; i < 3; i++){
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }
    return color;
  }
  palabrasBusqueda(tipo){
    // Tipo Busqueda
    if (tipo=='Palabras') {
      this.boolPalabra =true;
      this.boolTema=false;
    }
    if (tipo == 'Temas') {
      this.boolPalabra =false;
      this.boolTema=true;
    }
    this.TipoDeBusqueda=tipo;
    // console.log(tipo);
  }
  //Tipo busqueda 
  tipoBusqueda(tipo,fecha){    
    var fechaReset = new Date(Date.UTC(this.date.getUTCFullYear(),this.date.getUTCMonth(), this.date.getDate())).toISOString();
    // Fechas
    if (tipo=='Exacta') {
      this.Exacta=true;
      this.Rango=false;  
      this.eventBusqeda.time= fechaReset;    
    }
    if (tipo=='Rango') {
      this.Exacta=false;
      this.Rango=true;   
      this.eventBusqeda.timeStarts= fechaReset;
      this.eventBusqeda.timeEnds= fechaReset;   
    }
    this.TipoPT ='';  
    this.TemasBusqueda='';
    this.boolPalabra =false;
    this.boolTema = false;
    this.temasBusquedaBool = true;
    this.fechaTemasBusqueda = fechaReset;
    this.fechaTemasBusqueda2 = fechaReset;
    this.temasBusquedaFechas();
    // console.log(tipo+"fecha"+fecha);
  }
  TemasPalabras(tipo){ 
    this.TemasBusqueda =tipo;   
    // Fechas
    // console.log(tipo);
  }
  fechaBusqueda(fecha){
    this.fechaTemasBusqueda = fecha;
    this.fechaTemasBusqueda2 = fecha;
    this.temasBusquedaFechas();
    // console.log(fecha)
  }
  fechaBusqueda2(fecha){
    this.fechaTemasBusqueda = fecha;
    // this.fechaTemasBusqueda2 = fecha2;
    this.temasBusquedaFechas();
    // console.log(fecha)
  }
  fechaBusqueda3(fecha2){
    // this.fechaTemasBusqueda = fecha;
    this.fechaTemasBusqueda2 = fecha2;
    this.temasBusquedaFechas();
    // console.log(fecha)
  }
  temasBusquedaFechas(){
     // temas Proyect
     this.userService.getTemasBusqueda(window.localStorage.getItem('Tipo'),window.localStorage.getItem('Llaves'), this.fechaTemasBusqueda.substring(0,10),this.fechaTemasBusqueda2.substring(0,10))
     .subscribe(
       (data) => {
         this.FiltroTemas = data['results'];
        //  console.log(this.FiltroTemas);
        },
       (error) =>{
         console.error(error);
       })
  }
  // 
  logForm() {
    this.artTotalbusqueda=0;
    let loading = this.loadingCtrl.create({content:'Por favor espere...'});
    // this.nav.present(loading); //n
    loading.present(); 
    if(window.localStorage.getItem('Internet') === "false"){
      loading.dismiss();
      // loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'No esta conectado a internet',
            buttons: ['Aceptar']
          });
          // alert.present();
    }
    this.datos2Bus=[['Temas', 'Escenario Temático',{ role: 'style' },{ role: 'annotation' }]];
    this.datos3Bus=[['Temas', 'Escenario Temático']];
    this.datos3Bus.push(['Validado',0],['En proceso',0],['Atendido',0],['Eventos',0]);
    this.GeoTotalBusq=0;
    var contenido;
    // console.log(this.fomrbusqueda.value.Palabras);
    if (this.Exacta || this.Rango) {
      this.espera();
      if (this.TipoDeBusqueda =='Palabras') {
        contenido = this.fomrbusqueda.value.Palabras;
        this.TemasBusqueda ='NA';
      }else{
        contenido = "NA";
      }
      // console.log("temas ->"+ this.TemasBusqueda)
      // console.log("contenido ->"+ contenido)
      if (this.Exacta) {
        this.userService.getBusquedaEsp(window.localStorage.getItem('Proyecto'),this.eventBusqeda.time.substring(0,10),this.eventBusqeda.time.substring(0,10),contenido,'Exacta',this.TipoDeBusqueda,this.TemasBusqueda)
        .subscribe(
          (data) => { // Success
            loading.dismiss();
            this.ResultdoBusquda = data['results'];
            // console.log(this.ResultdoBusquda);
          },
          (error) =>{
            setTimeout(()=>{
              window.localStorage.setItem('Internet', 'false');
              loading.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Verifique su conexion a internet, esta tardando mas de lo necesario',
                buttons: ['Aceptar']
              });
              // alert.present();
              window.localStorage.setItem('Internet', 'true');
            },5000);
            console.error(error);
          }
        )
        // articulos    
    this.userService.getTabla2Busqueda(window.localStorage.getItem('Proyecto'),this.eventBusqeda.time.substring(0,10),this.eventBusqeda.time.substring(0,10),contenido,'Exacta',this.TipoDeBusqueda,this.TemasBusqueda)
    .subscribe(
      (data) => { // Success
        this.Articulos2 = data['results'];
        for (var re of this.Articulos2) {
          this.artTotalbusqueda = this.artTotalbusqueda + parseInt(re.Articulos);
        }
      },
      (error) =>{
        console.error(error);
      }
    )
        // grafica 1
        this.userService.getGraficaBus(window.localStorage.getItem('Proyecto'),this.eventBusqeda.time.substring(0,10),this.eventBusqeda.time.substring(0,10),contenido,'Exacta',this.TipoDeBusqueda,this.TemasBusqueda)
          .subscribe(
            (data) => { // Success
              this.GraficaProviderBusq = data['results'];
              for (var re of this.GraficaProviderBusq) {
                // console.log(re.id_tema_analisis_desc);
                this.datos2Bus.push([re.id_tema_analisis_desc,parseInt(re.total),'#5E192B',re.total]);
              } 
              var theigth =(this.GraficaProviderBusq.length * 55)+10;
              this.Barchart2 ={
                chartType: 'BarChart',
                dataTable: this.datos2Bus,
                options: {fontSize: 15,chartArea: {width: '60%', height:'70%', left: '35%'},legend: 'none', height: theigth},
              };       
            },
            (error) =>{
              console.error(error);
            }
          )
        // grafica 2
        // tablaGeo          
          this.userService.getTablaGeoBus(window.localStorage.getItem('Proyecto'),this.eventBusqeda.time.substring(0,10),this.eventBusqeda.time.substring(0,10),contenido,'Exacta',this.TipoDeBusqueda,this.TemasBusqueda)
          .subscribe(
            (data) => { // Success
              this.TablaGeoBus = data['results'];
              this.GeoTotalBusq=0;
              for (var re of this.TablaGeoBus) {
                this.GeoTotalBusq = this.GeoTotalBusq + parseInt(re.total);
              }
              this.datos3Bus[4]=['Eventos',this.GeoTotalBusq];
             // console.log("tabla "+this.GeoTotalBusq)
              // garfica 3
        this.userService.getStatusTablaBus(window.localStorage.getItem('Proyecto'),this.eventBusqeda.time.substring(0,10),this.eventBusqeda.time.substring(0,10),contenido,'Exacta',this.TipoDeBusqueda,this.TemasBusqueda)
        .subscribe(
          (data) => { // Success
            this.StatusTablaBusq = data['results'];
            for (var re of this.StatusTablaBusq) {
              this.datos3Bus[re.Status]=[re.nombre,parseInt(re.total)];
            }            
            var eventosTotales = this.datos3Bus[1][1]+this.datos3Bus[2][1]+this.datos3Bus[3][1];
            var eve = parseInt(this.datos3Bus[4][1]) - eventosTotales;
            if (eve<0) {
              eve =0;
            }
            this.datos3Bus[4] =['Eventos',eve];
            // console.log('->'+this.datos3Bus)
            this.noValidBusq =eve;
            this.totalAvancesBusq = eventosTotales + eve;
            this.pieChartData2 =  {
              chartType: 'PieChart',
              dataTable: this.datos3Bus,
              options: {fontSize: 15,chartArea: {width: '100%',height: '80%'},colors: ['#F1EE21', '#F16D21', '#488aff','#DCDCDC'],pieSliceTextStyle:{color:'black'}}
            };
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
       
        // this.TemasBusqueda
      }else{
        this.userService.getBusquedaEsp(window.localStorage.getItem('Proyecto'),this.eventBusqeda.timeStarts.substring(0,10),this.eventBusqeda.timeEnds.substring(0,10),contenido,'Rango',this.TipoDeBusqueda,this.TemasBusqueda)
        .subscribe(
          (data) => { // Success
            loading.dismiss();
            this.ResultdoBusquda = data['results'];
            // console.log(this.ResultdoBusquda);
          },
          (error) =>{
            setTimeout(()=>{
              window.localStorage.setItem('Internet', 'false');
              loading.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Verifique su conexion a internet, esta tardando mas de lo necesario',
                buttons: ['Aceptar']
              });
              // alert.present();
              window.localStorage.setItem('Internet', 'true');
            },5000);
            console.error(error);
          }
        )
        // articulos
        this.userService.getTabla2Busqueda(window.localStorage.getItem('Proyecto'),this.eventBusqeda.timeStarts.substring(0,10),this.eventBusqeda.timeEnds.substring(0,10),contenido,'Rango',this.TipoDeBusqueda,this.TemasBusqueda)
        .subscribe(
          (data) => { // Success
            this.Articulos2 = data['results'];
            for (var re of this.Articulos2) {
              this.artTotalbusqueda = this.artTotalbusqueda + parseInt(re.Articulos);
            }
          },
          (error) =>{
            console.error(error);
          }
        )
         // grafica 1
         this.userService.getGraficaBus(window.localStorage.getItem('Proyecto'),this.eventBusqeda.timeStarts.substring(0,10),this.eventBusqeda.timeEnds.substring(0,10),contenido,'Rango',this.TipoDeBusqueda,this.TemasBusqueda)
         .subscribe(
           (data) => { // Success
             this.GraficaProviderBusq = data['results'];
             for (var re of this.GraficaProviderBusq) {
               this.datos2Bus.push([re.id_tema_analisis_desc,parseInt(re.total),'#5E192B',re.total]);
             } 
             var theigth =(this.GraficaProviderBusq.length * 55)+10;
             this.Barchart2 ={
               chartType: 'BarChart',
               dataTable: this.datos2Bus,
               options: {fontSize: 15,chartArea: {width: '60%', height:'70%', left: '35%'},legend: 'none', height: theigth},
             };       
           },
           (error) =>{
             console.error(error);
           }
         )
        // garfica 2      
        this.userService.getTablaGeoBus(window.localStorage.getItem('Proyecto'),this.eventBusqeda.timeStarts.substring(0,10),this.eventBusqeda.timeEnds.substring(0,10),contenido,'Rango',this.TipoDeBusqueda,this.TemasBusqueda)
        .subscribe(
          (data) => { // Success
            this.TablaGeoBus = data['results'];
            for (var re of this.TablaGeoBus) {
              this.GeoTotalBusq = this.GeoTotalBusq + parseInt(re.total);
            }
            this.datos3Bus[4]=['Eventos',this.GeoTotalBusq];
            // console.log("geo"+this.GeoTotalBusq);
            //
            // grafica 3
        this.userService.getStatusTablaBus(window.localStorage.getItem('Proyecto'),this.eventBusqeda.timeStarts.substring(0,10),this.eventBusqeda.timeEnds.substring(0,10),contenido,'Rango',this.TipoDeBusqueda,this.TemasBusqueda)
        .subscribe(
          (data) => { // Success
            this.StatusTablaBusq = data['results'];
            for (var re of this.StatusTablaBusq) {
              this.datos3Bus[re.Status]=[re.nombre,parseInt(re.total)];
            }
            //console.log("status"+this.StatusTablaBusq.length);
            var eventosTotales = this.datos3Bus[1][1]+this.datos3Bus[2][1]+this.datos3Bus[3][1];
            var eve = parseInt(this.datos3Bus[4][1]) - eventosTotales;
            if (eve<0) {
              eve =0;
            }
            this.datos3Bus[4] =['Eventos',eve];
            //console.log(this.datos3Bus);
            this.noValidBusq =eve;
            this.totalAvancesBusq = eventosTotales + eve;
            this.pieChartData2 =  {
              chartType: 'PieChart',
              dataTable: this.datos3Bus,
              options: {fontSize: 15,chartArea: {width: '100%',height: '80%'},colors: ['#F1EE21', '#F16D21', '#488aff','#DCDCDC'],pieSliceTextStyle:{color:'black'}},
            };
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
        
      // 
      } // else tipo (exacta | rango)
      this.limpiarV=true;
    }else{
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Por favor seleccion una fecha!',
        buttons: ['OK']
      });
      // alert.present();
    }
  }
  limpiar(){
    this.fomrbusqueda.reset();
    this.BusqTipo='';
    this.TipoPT='';
    this.TemasBusqueda='';
    var fechaReset = new Date(Date.UTC(this.date.getUTCFullYear(),this.date.getUTCMonth(), this.date.getDate())).toISOString();
    // fechas
    this.eventBusqeda.time= fechaReset;
    this.eventBusqeda.timeStarts= fechaReset;
    this.eventBusqeda.timeEnds= fechaReset;
    // resultado
    this.ResultdoBusquda=[];
    this.GraficaProviderBusq=[];
    this.TablaGeoBus=[];
    this.StatusTablaBusq=[];
    // boolean
    this.Exacta=false;
    this.Rango=false;  
    this.limpiarV=false;
    this.boolTema =false;
    this.boolPalabra =false;   
    this.temasBusquedaBool = false; 
  }
  espera(){
    const loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 2000
    });
    loader.present();
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
   logout(): void {
    //  console.log('salir');
   }

}
