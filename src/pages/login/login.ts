import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
// paginas
import { PrincipalPage} from '../principal/principal';
// form
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
// provider
import { UserServiceProvider } from '../../providers/user-service/user-service';
// 
import { Events } from 'ionic-angular';
// network
// import { Network } from '@ionic-native/network';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // variables
  users_login: any[] = [];
  users_login2: any[] = [];
  users: any[]=[];
  internet = true;
private login : FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public alertCtrl: AlertController, public events: Events,
    public Loading: LoadingController) {
      // form validacion
      this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    events.subscribe('cargar:login', () => {
      this.verificar();
    });
    
  }
  ionViewWillEnter() { 
    window.localStorage.setItem('root', 'LoginPage');
   
  }
  ionViewDidEnter(){   
   }
  verificar() : void {
    if (window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username')=== null) {
      // this.events.publish('user:comprobarlog');
      console.log('verificar LoginPage');
    }
  }
  principal(usr){    
    // obtener los datos necesarios del usuario logeado
    this.userService.getUsuarios(usr)
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
        for (var re of this.users) {
          // asignarle valor a las variables de memoria
        window.localStorage.setItem('IDU',re.Id_User);
         window.localStorage.setItem('Nombre',re.Nombre_Us+' '+re.Ape_Pater_Us);
         window.localStorage.setItem('Tipo',re.Tipo);
         window.localStorage.setItem('Llaves',re.Llaves);
         window.localStorage.setItem('Url',re.url);
         window.localStorage.setItem('Proyecto',re.ID_Proyecto);
         window.localStorage.setItem('ProyectoNombre',re.Proyecto);
      }
      // window.location.reload(true);
      
      this.userService.getActualizaApp(window.localStorage.getItem('token'),window.localStorage.getItem('Llaves'),window.localStorage.getItem('username'),'Tulum')
          .subscribe(
            (data) => { // Success
              this.events.publish('user:login');
              this.navCtrl.setRoot(PrincipalPage);
      //         // 
            },
            (error) =>{
              console.error(error);
            }
          )
          console.log("token->"+window.localStorage.getItem('token'));
          console.log("token->"+window.localStorage.getItem('Llaves'));
      },
      (error) =>{
        console.error(error);
      }
    )
    // 
    
  }
 // form
  logForm(){
    let loading = this.Loading.create({content:'Iniciando....'});
    // // this.nav.present(loading); //n
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
    // Comprobacion de usr y psw  window.localStorage.removeItem('Numero');
    this.userService.getLogin(this.login.value.username,this.login.value.password,'Tulum')
    .subscribe(
      (data) => { // Success       
        this.users_login = data['results'];
        // console.log(this.users_login);
        if (this.users_login) {
          window.localStorage.setItem('username', this.login.value.username);
          window.localStorage.setItem('password', this.login.value.password);
          this.principal(this.login.value.username);
          loading.dismiss();
        }else{
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Usuario | Contraseña incorrectos',
            buttons: ['Aceptar']
          });
          alert.present();
        }
      },
      (error) =>{
        // alert(error);
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
    //
  }
}
