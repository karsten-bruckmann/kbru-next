import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'skat-list-start-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {}
