import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'ui-ionic-history-back',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './ionic-history-back.component.html',
  styleUrls: ['./ionic-history-back.component.scss'],
})
export class IonicHistoryBackComponent {
  constructor(private navController: NavController) {}

  @HostListener('click')
  public back(): void {
    this.navController.back();
  }
}
