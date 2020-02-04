import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidacionesPage } from './validaciones';

@NgModule({
  declarations: [
    ValidacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidacionesPage),
  ],
})
export class ValidacionesPageModule {}
