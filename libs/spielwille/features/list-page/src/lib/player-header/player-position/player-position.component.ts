import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PlayerPosition } from '@kbru/spielwille/core/skat-game-management';

@Component({
  selector: 'spielwille-list-page-player-position',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './player-position.component.html',
  styleUrls: ['./player-position.component.scss'],
})
export class PlayerPositionComponent {
  @Input()
  public position: PlayerPosition = 'inactive';
}
