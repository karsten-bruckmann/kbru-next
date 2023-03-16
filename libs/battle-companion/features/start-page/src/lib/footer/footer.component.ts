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

@Component({
  selector: 'battle-companion-start-page-footer',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslationManagementModule,
    FileInputComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
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
