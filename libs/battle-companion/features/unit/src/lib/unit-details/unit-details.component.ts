import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Unit, Weapon } from '@kbru/battle-companion/core/roster-management';
import { AvatarComponent } from '@kbru/shared/avatar-images/features/avatar';
import { first, Subject } from 'rxjs';

import { CleanEmptyPipe } from '../pipes/clean-empty.pipe';

@Component({
  selector: 'battle-companion-unit-details',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
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
