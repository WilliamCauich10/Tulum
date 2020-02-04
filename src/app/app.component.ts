import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController, MenuController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { LoginPage } from "../pages/login/login";
import { PrincipalPage  } from '../pages/principal/principal';
import { PerfilPage } from "../pages/perfil/perfil";
import { ChatPage } from '../pages/chat/chat';
import { AgendaPage } from "../pages/agenda/agenda";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { BackgroundMode } from '@ionic-native/background-mode';
import { FCM } from '@ionic-native/fcm';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
var config = {
  apiKey: "AIzaSyDzEixlgqWxSulhY04ocGc7pzD-XM19_4E",
  authDomain: "loboss.firebaseapp.com",
  databaseURL: "https://loboss.firebaseio.com",
  projectId: "loboss",
  storageBucket: "loboss.appspot.com",
  messagingSenderId: "933183362169"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = LoginPage;
  rootPage:any;
  notifi: boolean = true;
  foto;
  nombre;
  numero;
  totalM=0;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public events: Events, public menuCtrl: MenuController,private screenOrientation: ScreenOrientation,
    public toastCtrl: ToastController,private push: Push,public userService: UserServiceProvider,
    private backgroundMode: BackgroundMode,private fcm: FCM) {
      menuCtrl.enable(true);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.checkPreviousAuthorization();
      // this.backgroundMode.enable();
      this.pushSetup();
      this.orientacion();
      statusBar.styleDefault();
      splashScreen.hide();
    });
    window.localStorage.setItem('statusChat', 'true');
    events.subscribe('user:login', () => {
      this.loggedIn();
    });
    firebase.initializeApp(config);
    events.subscribe('chat:total', () => {
      this.tot();
    });
    events.subscribe('chat:totalreset', () => {
      this.reset();
    });
  }
  tot(){
    this.totalM = this.totalM+1;
  }
  reset(){
    this.totalM =0;
  }
   // notifciacion
   pushSetup(){
// to check if we have permission
this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });

// Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
// this.push.createChannel({
//  id: "testchannel1",
//  description: "My first test channel",
//  // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
//  importance: 4
// }).then(() => console.log('Channel created'));

// Delete a channel (Android O and above)
// this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

// Return a list of currently configured channels
this.push.listChannels().then((channels) => console.log('List of channels', channels))

      //  
      const options: PushOptions = {
        android: {
          senderID: '933183362169',
          clearNotifications: "true",
          forceShow: true
        },
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        }
     };
     
     const pushObject: PushObject = this.push.init(options);

     this.push.createChannel({
       id: "testchannel1",
       description: "My first test channel",
       sound: "sounddefault",
       // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
       importance: 4
      });
     pushObject.on('notification').subscribe ((data: any) => {
      //Your Logic
          if (data.additionalData.foreground) {
              // Background
              console.log("fore") 
            }
            else {
              console.log("back")  
              // if (data.additionalData.param1=='Noticia') {
              //   // this.rootPage = PrincipalPage;
              //   window.localStorage.setItem('FechaNot', data.param2);            
              //   // console.log(data.param2);
              //   this.events.publish('Principal: Fecha');
              // }
              // if(data.param1=='Chat'){
              //   this.rootPage = ChatPage;
              // }            
              // console.log(data);
              // Foreground  (data.additionalData.foreground)
        }
    });
    // pushObject.addListener('pushNotificationActionPerformed', 
    //   (notification: PushNotificationActionPerformed) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //   }
    // );
     pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
  
    //  pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
     
    //  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));       
    // //  console.log(window.localStorage.getItem("notificacion"));
     pushObject.on('registration').subscribe((registration: any) => 
      this.userService.getRegistroApp(registration.registrationId)
      .subscribe(
        (data) => {
          window.localStorage.setItem('token',registration.registrationId);
          console.log('Device registered', registration.registrationId)
        },
        (error) =>{
          console.log("no entra al push token")
          console.error(error);
        }
      )
      
    );
     pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    
    let backend;
  this.fcm.subscribeToTopic('marketing');

  this.fcm.getToken().then(token => {
    backend.registerToken(token);
  });

  this.fcm.onNotification().subscribe(data => {
    console.log(data);
    if(data.wasTapped){
      console.log(data.param1);
      console.log("Received in background");
      if (data.param1=='Noticia') {
        // this.rootPage = PrincipalPage;
        window.localStorage.setItem('FechaNot', data.param2);            
        // console.log(data.param2);
        this.events.publish('Principal: Fecha');
      }
      if(data.param1=='Chat'){
        this.rootPage = ChatPage;
      }
    } else {
      // alert(data.param1)
      console.log("Received in foreground");
    };
  });

  this.fcm.onTokenRefresh().subscribe(token => {
    backend.registerToken(token);
  });

  this.fcm.unsubscribeFromTopic('marketing');
  
  }
  checkPreviousAuthorization(): void {
    // console.log(window.localStorage.getItem('username'));    
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
       (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
      this.rootPage = LoginPage;
      window.localStorage.setItem('root', 'LoginPage');
    } else {
      this.foto= "http://inmonitor.red70s.net/app_sinaloa"+window.localStorage.getItem('Url');
      this.nombre =window.localStorage.getItem('Nombre');
      this.rootPage = PrincipalPage;
      window.localStorage.setItem('root', 'PrincipalPage');
    }
  }
  // 
  loggedIn() {
    this.foto= "http://inmonitor.red70s.net/app_sinaloa"+window.localStorage.getItem('Url');
    this.nombre =window.localStorage.getItem('Nombre');
  }
  orientacion(){
    console.log(this.screenOrientation.type); 
    this.screenOrientation.lock('portrait-primary');
    this.screenOrientation.onChange().subscribe(
      () => {
        if (this.screenOrientation.type=='landscape-primary') {
          console.log('~(-.-)~');
        }
      }
   );
  }
  // 
  // log out
  logout(): void {
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
    window.localStorage.removeItem('Nombre');
    window.localStorage.removeItem('Tipo');
    window.localStorage.removeItem('Llaves');
    window.localStorage.removeItem('Url');
    window.localStorage.removeItem('Proyecto');
    window.localStorage.removeItem('ProyectoNombre');
    window.localStorage.removeItem('statusChat');
    this.rootPage =LoginPage;
    this.closeMenu();
    this.events.publish('usuario: salir');
  }
  openPage(page){
    switch (page) {
      case 'PrincipalPage':
          window.localStorage.setItem('root', 'PrincipalPage');
          this.rootPage = PrincipalPage;
      break;
    
      case 'PerfilPage':
          window.localStorage.setItem('root', 'PerfilPage');
          this.rootPage = PerfilPage;
      break;
      case 'ChatPage':
          window.localStorage.setItem('root', 'ChatPage');
          this.rootPage = ChatPage;
      break;
      case 'AgendaPage':
      console.log("Agenda");
          window.localStorage.setItem('root', 'AgendaPage');
          this.rootPage = AgendaPage;
      break;      
      default:
        break;
    }
    console.log(page);
    this.closeMenu();
  }
  //Menu
  openMenu() {
    console.log("menu");
    this.menuCtrl.open();
  }
  closeMenu() {
    this.menuCtrl.close();
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
}

