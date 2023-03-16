import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FileInputComponent } from '@kbru/shared/ionic/ui/file-input';
import {
  TranslationManagementModule,
  translationsImported,
} from '@kbru/shared/translatable/core/translation-management';
import { Store } from '@ngrx/store';

import { RosterListComponent } from './roster-list/roster-list.component';

@Component({
  selector: 'battle-companion-start-page',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RosterListComponent,
    FileInputComponent,
    ReactiveFormsModule,
    TranslationManagementModule,
  ],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {
  constructor(private store$: Store) {}

  protected fileControl = new FormControl<File | null>(null);

  protected async importTranslations(file: File | null): Promise<void> {
    if (!file) {
      return;
    }

    const content = await file.text();
    this.store$.dispatch(translationsImported({ fileContent: content }));
  }
}
