import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ListPageComponent } from '../list-page.component';

@Component({
  selector: 'spielwille-list-page-debug',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent {
  constructor(private listPageComponent: ListPageComponent) {}

  protected list$ = this.listPageComponent.list$;
}
