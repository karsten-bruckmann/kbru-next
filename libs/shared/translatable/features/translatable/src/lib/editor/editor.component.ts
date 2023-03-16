import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  translationChanged,
  translationSelector,
} from '@kbru/shared/translatable/core/translation-management';
import { Store } from '@ngrx/store';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'feature-translatable-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  constructor(private store$: Store) {}

  @Input() public set text(text: string) {
    this.text$.next(text);
  }

  protected text$ = new BehaviorSubject<string>('');

  protected translation$ = this.text$.pipe(
    switchMap((text) => this.store$.select(translationSelector(text)))
  );

  protected set translation(translation: string) {
    this.store$.dispatch(
      translationChanged({ text: this.text$.value, translation })
    );
  }
}
