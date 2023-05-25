import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PlayerInfo } from '@kbru/spielwille/core/skat-game-management';

@Component({
  selector: 'spielwille-list-page-player-infos',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './player-infos.component.html',
  styleUrls: ['./player-infos.component.scss'],
})
export class PlayerInfosComponent {
  @Input() public set infos(infos: PlayerInfo[]) {
    if (
      !infos.includes('can-choose-farbe') &&
      !infos.includes('can-choose-grand') &&
      !infos.includes('can-choose-ramsch')
    ) {
      this.romanowPlayerInfos = null;
    } else {
      this.romanowPlayerInfos = {
        farbe: infos.includes('can-choose-farbe'),
        grand: infos.includes('can-choose-grand'),
        ramsch: infos.includes('can-choose-ramsch'),
      };
    }

    this.dealer = infos.includes('dealer');
  }

  protected dealer = false;

  protected romanowPlayerInfos: {
    farbe: boolean;
    grand: boolean;
    ramsch: boolean;
  } | null = null;
}
