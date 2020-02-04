import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventosdePage } from './eventosde';

@NgModule({
  declarations: [
    EventosdePage,
  ],
  imports: [
    IonicPageModule.forChild(EventosdePage),
  ],
})
export class EventosdePageModule {}
