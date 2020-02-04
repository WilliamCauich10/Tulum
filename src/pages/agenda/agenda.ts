import { Component,ViewChild } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams,AlertController,ModalController,MenuController, Content } from 'ionic-angular';
// import * as moment from 'moment';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { EventosdePage } from "../eventosde/eventosde";
// import { EventModalPage } from "../event-modal/event-modal";
declare var Fecha;
@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {  
  @ViewChild(Content) content: Content;
  EventosAgenda: any[] = [];
  currentEvents = [];
  eventosDia : any[] = [];
  segmento: any[] = [];
  DiaSemana;
  fecha;
  fechaEventoNW;
  SegemtWidth: any
  SegmentosAgendas: string = "";
  rst3 = false;
  AgendaId=1;
  MAgenda;
  YAgenda;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
    public userService: UserServiceProvider,public modalCtrl: ModalController,public menuCtrl: MenuController,
    public loadingCtrl: LoadingController) {
      console.log(window.localStorage.getItem('AgendaIdProyecto'));
      // this.SegmentosAgendas ="Gobernador";
    }
//  ionViewWillEnter(){
//   // this.SegmentosAgendas ="Gobernador";
//     let loading = this.loadingCtrl.create({content:'Por favor espere...'});
//     loading.present(); 
//     this.userService.getSegmentosAgenda()
//     .subscribe(
//       (data) => { // Success
//         this.segmento = data['results'];
//         console.log(this.segmento);
//         if(this.segmento.length>0  ){
//           this.SegmentosAgendas = this.segmento[this.segmento.length-1]['Proyecto'];
//         }
//         if (this.segmento.length == 1) {
//           this.SegemtWidth = '100%';
//         }else if(this.segmento.length == 2){
//           this.SegemtWidth = '50%';
//         }else{
//           this.SegemtWidth = '34%';
//         }
//         loading.dismiss();
//         if(this.segmento.length>0  ){
//           this.SegmentosAgendas = this.segmento[0]['Proyecto'];
//         }
//       },
//       (error) =>{
//         setTimeout(()=>{
//           window.localStorage.setItem('Internet', 'false');
//           loading.dismiss();
//           let alert = this.alertCtrl.create({
//             title: 'Error',
//             subTitle: 'Verifique su conexion a internet, esta tardando mas de lo necesario',
//             buttons: ['Aceptar']
//           });
//           // alert.present();
//           window.localStorage.setItem('Internet', 'true');
//         },5000);
//         console.error(error);
//       }
//     )
//       window.localStorage.setItem('root', 'AgendaPage');
//   }
//   ionViewCanEnter() {
//     // 
//     this.SegemtWidth = '100%';
//     // 
//     this.eventosDia =[];
//     var f = new Date();
//     var fechaST= new Date(Date.UTC(f.getUTCFullYear(),f.getUTCMonth(), f.getDate()));
//     var dia = fechaST.getDate()+1;
//     var mes =  fechaST.getUTCMonth()+1;
//     var año =  fechaST.getUTCFullYear();
//     this.fecha =dia+"/"+mes+"/"+año;
//     this.fechaEventoNW =mes+"/"+dia+"/"+año;
//     var f2 = new Fecha(año+'-'+mes+'-'+dia);
//     this.DiaSemana = Fecha.dias_semanas[f2.getNumeroDiaSemana()]
//     // 
//     var m;
//     if (mes<=9) {
//       m='0'+mes;
//     }else{
//       m= mes;
//     }
//     this.MAgenda =m;
//     this.YAgenda =año;
//     this.getEventos(m,año,this.AgendaId);
//   }
//   cambioAgenda(id){
//     this.AgendaId = id;
//     // console.log("Id de agenda"+this.AgendaId+" Camnio "+id+" mes "+this.MAgenda);
//     // this.ionViewCanEnter();
//     this.getEventos(this.MAgenda,this.YAgenda,this.AgendaId);
//   }
//   onChange($event) {
//     console.log($event);
//     this.eventosDia =[];
//     var dia= $event.date;
//     var mes = $event.month+1;
//     var año = $event.year;
//     var fecha = dia+"/"+mes+"/"+año;
//     this.fecha = fecha;
//     this.fechaEventoNW =mes+"/"+dia+"/"+año;
//     // var evento = $event.isHoliday;
//     var evento= $event.hasEvent;
//     var f1 = new Fecha(año+'-'+mes+'-'+dia);
//     this.DiaSemana = Fecha.dias_semanas[f1.getNumeroDiaSemana()];
  
//     if (evento == true) {   
//       this.eventosDia =[]; 
//       this.CargarEventos(año,mes,dia,fecha);
//     }//if
//   } //
//   onMonthSelect(event){
//     var m;
//     if (event.month<=9) {
//       m='0'+(event.month+1);
//     }else{
//       m= (event.month+1);
//     }
//     this.MAgenda =m;
//     this.YAgenda = event.year;
//     this.getEventos(m,event.year,this.AgendaId);
//     this.eventosDia =[];
//     var f = new Date();
//     var fechaST= new Date(Date.UTC(f.getUTCFullYear(),f.getUTCMonth(), f.getDate()));
//     var dia = fechaST.getDate()+1;
//     var mes =  fechaST.getUTCMonth()+1;
//     var año =  fechaST.getUTCFullYear();
//     this.fecha =dia+"/"+mes+"/"+año;    
//     this.fechaEventoNW =mes+"/"+dia+"/"+año;
//     var f2 = new Fecha(año+'-'+mes+'-'+dia);
//     this.DiaSemana = Fecha.dias_semanas[f2.getNumeroDiaSemana()]
//   }
//   // carga los eventos
//   getEventos(m,a,id){
//     this.EventosAgenda =[];
//     var me = parseInt(m)-1;
//     console.log(m+"Agenda id "+me);    
//     this.userService.getEventM(me+1,a,id)
//     .subscribe(
//       (data) => { // Success
//         this.EventosAgenda = data['results'];
//         this.currentEvents=[];
//         for (let index = 0; index < this.EventosAgenda.length; index++) { 
//           this.currentEvents.push(            
//               {
//                 year: a,
//                 month: me,
//                 date: this.EventosAgenda[index]['Fecha'].substring(3,5),
//                 reason: this.EventosAgenda[index]['Actividad'],
//                 time1: this.EventosAgenda[index]['horaIni'],
//                 time2: this.EventosAgenda[index]['horaFin'],
//                 lugar: this.EventosAgenda[index]['Direccion'],
//                 Id: this.EventosAgenda[index]['Id'],
//                 St: this.EventosAgenda[index]['Status'],
//               }            
//           );
//         }
//         var meses, años;
//         if (this.fecha.substring(3,4)>1) {
//           meses= '0'+this.fecha.substring(3,4);
//           años =this.fecha.substring(5,9);
//         }else{
//           meses= this.fecha.substring(3,5);
//           años =this.fecha.substring(6,10);
//         }
//         this.CargarEventos(años,meses,this.fecha.substring(0,2),this.fecha);
//       },
//       (error) =>{
//         console.error(error);
//       }
//     )  
//   }
//   onEventSelected(event){
//     // console.log(event);
//   }
//   CargarEventos(año,mes,dia,fecha){
//     // console.log(dia+"/"+mes+"/"+año+"--"+fecha);
//     let loading = this.loadingCtrl.create({content:'Cargando Agenda...'});
//     loading.present();     
//     for (let index = 0; index < this.currentEvents.length; index++) {
//       if (this.currentEvents[index]['year'] == año && this.currentEvents[index]['month']+1 == mes && this.currentEvents[index]['date'] == dia) {
//         this.eventosDia.push([
//           {
//             'Dia': fecha,
//             'Titulo':this.currentEvents[index]['reason'],
//             'HoraInicio':this.currentEvents[index]['time1'],
//             'HoraFin':this.currentEvents[index]['time2'],
//             'Lugar':this.currentEvents[index]['lugar'],
//             'IdEvento':this.currentEvents[index]['Id'],
//             'St':this.currentEvents[index]['St']
//           }
//         ]);
//       }
//     }
//     loading.dismiss();
//     // console.log(this.eventosDia);
//   }
//   modalDetalleEvent(id){
//     // this.navCtrl.push(EventosdePage,{id:id})
//     var $event,d='no'    
//     let modal = this.modalCtrl.create(EventosdePage,{id:id});
//     modal.onDidDismiss(data => {
//       window.localStorage.setItem('root', 'AgendaPage');
//       d=data;
//       if (data=='si') {  
//         var meses,m1, años;
//         if (this.fecha.substring(3,4)>1) {
//           meses= '0'+this.fecha.substring(3,4);
//           m1=this.fecha.substring(3,4);
//           años =this.fecha.substring(5,9);
//         }else{
//           meses= this.fecha.substring(3,5);
//           m1 =this.fecha.substring(3,5);
//           años =this.fecha.substring(6,10);
//         }
//         $event ={
//           year: parseInt(años),
//           month: m1-1,
//           date: parseInt(this.fecha.substring(0,2)),
//           isThisMonth: true,
//           isToday: false,
//           hasEvent: true,
//           isSelect: true,
//         };
//         this.ionViewCanEnter();
//       }
//    }); 
//     modal.present();
//   }
  
//   modalCrearEvent(){
//     var f,meses;
//     if (this.fechaEventoNW.substring(0,1)>1) {
//       meses= '0'+this.fechaEventoNW.substring(0,1);
//       f=meses+"/"+this.fechaEventoNW.substring(2);
//     }else{
//       f=this.fechaEventoNW;
//     }
//     // console.log(f);
//     // this.navCtrl.push(EventModalPage,{fecha:f})S
  
//   }
//   // 
//   selectedSegment(Seg) {
//     this.SegmentosAgendas=Seg;
//     this.content.scrollToTop();
//     // this.modalCrearEvent();
//     // console.log(this.fecha);
//   }
//    //Menu
//    openMenu() {
//     this.menuCtrl.open();
//   }
//   closeMenu() {
//     this.menuCtrl.close();
//   }
//   toggleMenu() {
//     this.menuCtrl.toggle();
//   }
}
