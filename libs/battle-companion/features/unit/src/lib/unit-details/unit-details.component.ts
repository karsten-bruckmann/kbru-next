import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Unit, Weapon } from '@kbru/battle-companion/core/roster-management';
import { AvatarComponent } from '@kbru/shared/features/avatar';
import { TranslatableComponent } from '@kbru/shared/features/translatable';
import { first, Subject } from 'rxjs';

import { CleanEmptyPipe } from '../pipes/clean-empty.pipe';

@Component({
  selector: 'battle-companion-unit-details',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AvatarComponent,
    TranslatableComponent,
    CleanEmptyPipe,
  ],
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.scss'],
})
export class UnitDetailsComponent implements AfterViewInit {
  constructor(private cleanEmptyPipe: CleanEmptyPipe) {}

  @Input() unit?: Unit;

  @Output() avatarLoaded = new Subject<void>();

  @ViewChild(AvatarComponent)
  public avatarComponent?: AvatarComponent;

  public getMultiProfileWeaponLineAmount(weapon: Weapon): number {
    return weapon.profiles.reduce(
      (lines, profile) =>
        lines + (this.cleanEmptyPipe.transform(profile.abilities) ? 2 : 1),
      1
    );
  }

  public ngAfterViewInit(): void {
    if (!this.avatarComponent) {
      return;
    }
    this.avatarComponent.avatarLoaded.pipe(first()).subscribe(() => {
      this.avatarLoaded.next();
    });
  }
}
