import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'war-game-companion-build-data-sources',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './build-data-sources.component.html',
  styleUrls: ['./build-data-sources.component.scss'],
})
export class BuildDataSourcesComponent {
  constructor(private nav: NavController) {}

  protected close(): void {
    this.nav.back();
  }
}
