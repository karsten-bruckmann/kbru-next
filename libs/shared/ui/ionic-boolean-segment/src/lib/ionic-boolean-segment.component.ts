/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'ui-ionic-boolean-segment',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './ionic-boolean-segment.component.html',
  styleUrls: ['./ionic-boolean-segment.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IonicBooleanSegmentComponent),
    },
  ],
})
export class IonicBooleanSegmentComponent implements ControlValueAccessor {
  @Input() public labels: { true: string; false: string } = {
    true: '',
    false: '',
  };

  @Input() public set first(first: 'true' | 'false') {
    switch (first) {
      case 'true':
        this.order = ['true', 'false'];
        return;
      case 'false':
        this.order = ['false', 'true'];
        return;
    }
  }

  protected enabled: ('true' | 'false')[] = ['true', 'false'];
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('enabled') public set _enabled(e: boolean[]) {
    this.enabled = e.map((v) => (v ? 'true' : 'false'));
  }

  protected order: ('true' | 'false')[] = ['true', 'false'];

  protected value: boolean | null = false;
  protected disabled = false;

  protected onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  public set(value: string) {
    const v = value === 'true';
    if (v !== this.value) {
      this.value = v;
      this.onChange(v);
    }
  }

  public writeValue(obj: any): void {
    if (typeof obj !== 'boolean') {
      this.value = null;
    }
    this.value = obj;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
