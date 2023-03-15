import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  avatarImageAdded,
  avatarImageRemoved,
  avatarImageSelector,
  ImageManagementModule,
} from '@kbru/shared/avatar-images/core/image-management';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  NEVER,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'feature-avatar',
  standalone: true,
  imports: [CommonModule, IonicModule, ImageManagementModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  constructor(private store$: Store) {}

  @Input() editable = false;
  @Input() public set name(name: string) {
    this.name$.next(name);
  }

  @Output() avatarLoaded = new Subject<void>();

  public name$ = new BehaviorSubject<string | null>(null);
  public data$: Observable<string | null> = this.name$.pipe(
    switchMap((name) =>
      name ? this.store$.select(avatarImageSelector(name)) : NEVER
    ),
    tap((image) => {
      if (!image) {
        this.avatarLoaded.next();
      }
    })
  );

  public async save(event: Event): Promise<void> {
    const name = this.name$.value;
    if (!name) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file = (event as any).target.files[0];
    this.store$.dispatch(avatarImageAdded({ name, image: file }));
  }

  public delete(): void {
    const name = this.name$.value;
    if (!name) {
      return;
    }
    if (!this.name$.value) {
      return;
    }
    this.store$.dispatch(avatarImageRemoved({ name }));
  }
}
