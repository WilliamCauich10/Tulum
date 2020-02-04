import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
// provider
import { UserServiceProvider } from '../../providers/user-service/user-service';
// 
import { PopoverPage } from "../popover/popover";
// 
import { Events } from 'ionic-angular';
// 
import { PopoverController } from 'ionic-angular';
// 
import {Content} from 'ionic-angular';
// firebase
import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  username: string = window.localStorage.getItem('Nombre');
  message: string="";
  chat=[];
  proyecto = window.localStorage.getItem('ProyectoNombre');
  chat2:any[]=[];
  itemList;
  loadeditemList;
  date;
  fecha;
  fechaStatus= true;
  // 
  notif: any[] = [];
  // 
  inicio =0;
  fin = 10;
  limit: number = 15;
  itemRef;
  scrolver =false;
  estatusPagina;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController,public events: Events,
    public userService: UserServiceProvider, public popoverCtrl: PopoverController) {
      this.getMessages();    
      this.estatusPagina = false;
      window.localStorage.setItem('statusChat', 'true');
      this.events.publish('chat:totalreset');
      // events.subscribe('vibracion: chat', () => {
      //   this.vibracio1n();
      // });  
      console.log(this.proyecto);
     
    }
  ionViewDidEnter() {
    this.content.scrollToBottom(0)
  }
  ionViewCanEnter() { 
    window.localStorage.setItem('root', 'ChatPage');
    this.estatusPagina=true;
    this.content.scrollToBottom(0);
    console.log('ionViewDidLoad ChatPage');
  }
  ionViewDidLeave(){
    this.scrolver=true;
    // this.estatusPagina=false;
    window.localStorage.setItem('statusChat', 'false');
  }
  getMessages(){
    this.itemRef = firebase.database().ref(this.proyecto).child("mensajes").orderByChild('timestamp'); // or however you mark time
      this.itemRef.on("value",(snap)=>{
        this.itemRef.limitToLast(this.limit).once('value', itemList => {
          let items = [];
          itemList.forEach( item => {
            items.push(item.val());            
            return false;
          });
          this.itemList = items;
          this.loadeditemList = items;  
          this.scrolver=false;
        });
      });
  }
  agregar(){
    this.limit = 15; // or however many more you want to load
    this.itemRef.limitToLast(this.limit).once('value', itemList => {
      let items = [];
      itemList.forEach( item => {
        items.push(item.val());
        return false;
      });
      // setTimeout(() => {
        this.itemList = items;
        this.loadeditemList = items;
        this.content.scrollToBottom(300);
      // }, 1000);
      
    });
  }
  notificacion(){
    this.userService.getChatNotifi(window.localStorage.getItem('username'),window.localStorage.getItem('Proyecto'),'Tulum')
    .subscribe(
      (data) => { // Success
        this.notif = data['results'];
        console.log(this.notif)
        // this.verAnalisis();
      },
      (error) =>{
        console.error(error);
      }
    )
  }
  onInfiniteScroll(event) {
    this.limit += 5; // or however many more you want to load
    this.itemRef.limitToLast(this.limit).once('value', itemList => {
      let items = [];
      itemList.forEach( item => {
        items.push(item.val());
        return false;
      });
      setTimeout(() => {
        this.itemList = items;
        this.loadeditemList = items;
        event.complete();
        // this.content.scrollToBottom(300);
      }, 1000);
    });
}
  sendMessage(){
    this.date= new Date();
    this.fecha = new Date(Date.UTC(this.date.getUTCFullYear(),this.date.getUTCMonth(), this.date.getDate())).toISOString();
    var fecha1,hora,minutos, tiempo;
    fecha1 = this.fecha.substring(0,10);
    hora = this.date.getHours().toString();
    minutos =this.date.getUTCMinutes().toString();
    if (this.date.getUTCMinutes()<10) {
      minutos ='0'+this.date.getUTCMinutes().toString();
    }else{
      minutos =this.date.getUTCMinutes().toString();
    }
    tiempo = hora+':'+minutos;
    var messagesRef = firebase.database().ref(this.proyecto).child("mensajes");
    messagesRef.push({usuario: this.username, mensaje: this.message, fecha: fecha1, hora: tiempo});
    this.message="";
    this.scrollToBottom();
    this.notificacion();
    // this.content.scrollToBottom();
  }
    scrollToBottom(){
      this.content.resize();
      this.content.scrollToBottom(300);
    }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
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

