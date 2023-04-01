import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  addPlayerFormSubmittedAction,
  GroupManagementModule,
  PlayerForm,
  PlayerFormService,
} from '@kbru/skat-list/core/group-management';
import { Store } from '@ngrx/store';
import { filter, map, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'skat-list-group-page-add-player-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    GroupManagementModule,
  ],
  templateUrl: './add-player-form.component.html',
  styleUrls: ['./add-player-form.component.scss'],
})
export class AddPlayerFormComponent {
  constructor(
    private store$: Store,
    private playerFormService: PlayerFormService,
    private activatedRoute: ActivatedRoute
  ) {}

  @Output()
  public added = new EventEmitter<void>();

  @Output()
  public canceled = new EventEmitter<void>();

  protected form$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('groupId')),
    filter((groupId): groupId is string => !!groupId),
    switchMap((groupId) => this.playerFormService.getAddForm$([groupId])),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public submit(form: PlayerForm): void {
    this.store$.dispatch(addPlayerFormSubmittedAction({ value: form.value }));
    this.added.next();
  }

  public cancel(): void {
    this.canceled.next();
  }
}
