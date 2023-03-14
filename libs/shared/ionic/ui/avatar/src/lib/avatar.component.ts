import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { avatarImageSelector } from 'avatar-images';
import { avatarImageAdded } from 'libs/shared/avatar-images/data-access/avatar-images/src/lib/actions/avatar-image-added.action';
import {
  BehaviorSubject,
  NEVER,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
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
    this.imagesService.deleteImage(name);
  }
}
