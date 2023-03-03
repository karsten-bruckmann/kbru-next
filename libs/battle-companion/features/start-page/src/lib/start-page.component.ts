import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { RosterListComponent } from './roster-list/roster-list.component';

@Component({
  selector: 'battle-companion-start-page',
  standalone: true,
  imports: [CommonModule, IonicModule, RosterListComponent],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {}
