import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PlayComponent } from './play.component';
import { playRoutes } from './play.routes';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(playRoutes)],
  declarations: [PlayComponent],
})
export class PlayModule {}
