import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any[] = [];
  constructor(public navCtrl: NavController, public userService: UserServiceProvider) {

  }
  ionViewDidLoad(){
    this.userService.getUsers()
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
        console.log(this.users);
        
      },
      (error) =>{
        console.error(error);
      }
    )
  }

}
