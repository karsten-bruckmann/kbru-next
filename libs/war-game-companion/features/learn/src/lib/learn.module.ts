import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LearnComponent } from './learn.component';
import { learnRoutes } from './learn.routes';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(learnRoutes)],
  declarations: [LearnComponent],
})
export class LearnModule {}
