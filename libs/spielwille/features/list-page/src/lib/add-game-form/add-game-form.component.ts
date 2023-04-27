import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicBooleanSegmentComponent } from '@kbru/shared/ui/ionic-boolean-segment';
import { IonicListInputComponent } from '@kbru/shared/ui/ionic-list-input';
import {
  LIST_ID$,
  listSelector,
  SkatGameFormGroup,
  SkatGameManagementModule,
} from '@kbru/spielwille/core/skat-game-management';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'spielwille-list-page-add-game-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IonicListInputComponent,
    ReactiveFormsModule,
    SkatGameManagementModule,
    IonicBooleanSegmentComponent,
  ],
  providers: [
    SkatGameFormGroup,
    {
      provide: LIST_ID$,
      useFactory: (activatedRoute: ActivatedRoute) =>
        activatedRoute.paramMap.pipe(
          map((paramMap) => paramMap.get('listId')),
          filter((groupId): groupId is string => !!groupId)
        ),
      deps: [ActivatedRoute],
    },
  ],
  templateUrl: './add-game-form.component.html',
  styleUrls: ['./add-game-form.component.scss'],
})
export class AddGameFormComponent {
  constructor(
    private skatGameFormGroup: SkatGameFormGroup,
    private activatedRoute: ActivatedRoute,
    private store$: Store
  ) {}

  @Output() public submitted = new EventEmitter<void>();

  protected list$ = this.activatedRoute.paramMap.pipe().pipe(
    map((paramMap) => paramMap.get('listId')),
    filter((groupId): groupId is string => !!groupId),
    switchMap((listId) => this.store$.select(listSelector(listId)))
  );

  protected form$ = this.skatGameFormGroup.effectAware$;

  protected submit(form: SkatGameFormGroup): void {
    this.skatGameFormGroup.submit(form);
    this.submitted.next();
  }

  protected hasAdditionalControls(formGroup: SkatGameFormGroup): boolean {
    return (
      Object.keys(formGroup.controls).filter(
        (name) =>
          !['listId', 'playerIndex', 'gameType', 'addsBockSet', 'won'].includes(
            name
          )
      ).length > 0
    );
  }
}
