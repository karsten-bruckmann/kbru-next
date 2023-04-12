import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicListInputComponent } from '@kbru/shared/ui/ionic-list-input';
import {
  GameManagementModule,
  listSelector,
  Player,
  SkatGameFormGroup,
  SkatGameFormService,
} from '@kbru/skat-list/core/game-management';
import { Store } from '@ngrx/store';
import { filter, map, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'skat-list-list-page-add-game-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IonicListInputComponent,
    ReactiveFormsModule,
    GameManagementModule,
  ],
  templateUrl: './add-game-form.component.html',
  styleUrls: ['./add-game-form.component.scss'],
})
export class AddGameFormComponent {
  constructor(
    private skatGameFormService: SkatGameFormService,
    private activatedRoute: ActivatedRoute,
    private store$: Store
  ) {}

  public open = false;

  private listId$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('listId')),
    filter((groupId): groupId is string => !!groupId)
  );

  protected list$ = this.listId$.pipe(
    switchMap((listId) => this.store$.select(listSelector(listId)))
  );

  protected form$ = this.listId$.pipe(
    switchMap((groupId) => this.skatGameFormService.getForm$(groupId)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected submit(form: SkatGameFormGroup): void {
    this.skatGameFormService.submit(form);
    this.open = false;
  }

  protected playerName(index: number, players: Player[]): string | null {
    return players[index]?.name || null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected fieldErrors(form: FormGroup): any {
    return Object.keys(form.controls).reduce((errors, name) => {
      if (form.controls[name].errors === null) {
        return errors;
      }
      return { ...errors, [name]: form.controls[name].errors };
    }, {});
  }
}
