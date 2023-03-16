import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  TranslationManagementModule,
  translationSelector,
} from '@kbru/shared/translatable/core/translation-management';
import { Store } from '@ngrx/store';
import { BehaviorSubject, switchMap } from 'rxjs';

import { EditorComponent } from './editor/editor.component';

@Component({
  selector: 'feature-translatable',
  standalone: true,
  imports: [CommonModule, TranslationManagementModule, IonicModule],
  templateUrl: './translatable.component.html',
  styleUrls: ['./translatable.component.scss'],
})
export class TranslatableComponent {
  constructor(
    private modalController: ModalController,
    private store$: Store
  ) {}

  @Input() public set text(text: string) {
    this.text$.next(text);
  }

  @Input() public translateOnClick = true;

  protected text$ = new BehaviorSubject<string>('');

  protected translation$ = this.text$.pipe(
    switchMap((text) => this.store$.select(translationSelector(text)))
  );

  @HostListener('click')
  public async openEditor(): Promise<void> {
    if (!this.translateOnClick) {
      return;
    }

    const modal = await this.modalController.create({
      component: EditorComponent,
      componentProps: {
        text: this.text$.value,
      },
    });

    modal.present();
  }
}
