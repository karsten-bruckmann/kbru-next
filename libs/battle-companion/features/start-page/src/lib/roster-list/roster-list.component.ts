import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  AddRosterForm,
  rosterDeleted,
  rosterListSelector,
  RosterManagementModule,
} from '@kbru/battle-companion/core/roster-management';
import { FileInputComponent } from '@kbru/shared/ui/ionic/file-input';
import { Store } from '@ngrx/store';

@Component({
  selector: 'battle-companion-start-page-roster-list',
  standalone: true,
  imports: [
    RosterManagementModule,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FileInputComponent,
    RouterModule,
  ],
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss'],
})
export class RosterListComponent {
  constructor(private addRosterForm: AddRosterForm, private store$: Store) {}

  public form = this.addRosterForm.get();

  public list$ = this.store$.select(rosterListSelector);

  public submit(): void {
    this.addRosterForm.submit(this.form);
  }

  protected deleteRoster(id: string): void {
    this.store$.dispatch(rosterDeleted({ id }));
  }
}
