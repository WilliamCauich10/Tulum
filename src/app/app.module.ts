import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PrincipalPage }from '../pages/principal/principal';
import { DetallePage } from '../pages/detalle/detalle';
import { PerfilPage } from "../pages/perfil/perfil";
import { ValidacionesPage } from '../pages/validaciones/validaciones';
import { AgregareportePage } from '../pages/agregareporte/agregareporte';
import { ComentariosPage } from "../pages/comentarios/comentarios";
import { ChatPage } from '../pages/chat/chat';
import { PopoverPage } from "../pages/popover/popover";
import { OpcionesPage } from "../pages/opciones/opciones";
import { AgendaPage } from "../pages/agenda/agenda";
import { EventosdePage } from "../pages/eventosde/eventosde";
// 
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera'
// import { Transfer } from '@ionic-native/transfer';
import { Push } from '@ionic-native/push';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ExpandableHeaderComponent } from "../components/expandable-header/expandable-header";
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { CalendarModule } from 'ionic3-calendar-en';
import * as moment from 'moment'; 
import { Base64 } from '@ionic-native/base64/ngx';
import { FCM } from '@ionic-native/fcm';
import { BackgroundMode } from '@ionic-native/background-mode';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PrincipalPage,
    DetallePage,
    PerfilPage,
    ValidacionesPage,
    ComentariosPage,
    ChatPage,    
    AgendaPage,
    AgregareportePage,
    EventosdePage,
    PopoverPage,
    OpcionesPage,
    ExpandableHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2GoogleChartsModule,    
    IonicModule.forRoot(MyApp),
    CalendarModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PrincipalPage,
    DetallePage,
    PerfilPage,
    ValidacionesPage,
    ComentariosPage,
    ChatPage,    
    AgendaPage,
    AgregareportePage,
    EventosdePage,
    PopoverPage,
    OpcionesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    DocumentViewer,
    InAppBrowser,
    File,
    FileTransfer,
    Camera,
    FilePath,
    Base64,
    Push,
    BackgroundMode,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
  ]
})
export class AppModule {}
