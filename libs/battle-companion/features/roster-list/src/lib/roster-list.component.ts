import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  AddRosterForm,
  RosterManagementModule,
} from '@kbru/battle-companion/core/roster-management';
import { FileInputComponent } from '@kbru/shared/ionic/ui/file-input';

@Component({
  selector: 'battle-companion-roster-list',
  standalone: true,
  imports: [
    RosterManagementModule,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FileInputComponent,
  ],
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.scss'],
})
export class RosterListComponent {
  constructor(private addRosterForm: AddRosterForm) {}

  public form = this.addRosterForm.get();

  public submit(): void {
    this.addRosterForm.submit(this.form);
  }
}
