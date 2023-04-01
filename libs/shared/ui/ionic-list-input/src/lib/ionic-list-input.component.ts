/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'ui-ionic-list-input[allowedValues]',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './ionic-list-input.component.html',
  styleUrls: ['./ionic-list-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IonicListInputComponent),
    },
  ],
})
export class IonicListInputComponent<T = string>
  implements ControlValueAccessor, OnChanges
{
  @Input() public multiple = false;
  @Input() public disabled = false;
  @Input() public length = 2;
  @Input() public allowedValues: T[] = [];

  protected value: (T | null)[] = [];
  protected allowedItemValues: T[][] = [];

  @Input() public addItem?: () => void;
  @Input() public getLabel: (index: number) => string = () => 'Bitte wählen';
  @Input() public getItemPlaceholder: (index: number) => string | null = () =>
    null;
  @Input() public getItemLabel: (value: T) => string = (value) => `${value}`;

  public onChange: (value: unknown) => void = () => {
    return;
  };

  public onTouched: () => void = () => {
    return;
  };

  writeValue(obj: any): void {
    if (!Array.isArray(obj)) {
      this.value = [];
    } else {
      this.value = [...obj];
    }
    for (let i = 0; i < this.length; i++) {
      if (!this.value[i]) {
        this.value[i] = null;
      }
      this.allowedItemValues[i] = this.multiple
        ? [...this.allowedValues]
        : this.allowedValues.filter(
            (value) =>
              !this.value
                .filter((v, ii) => i !== ii)
                .flat()
                .includes(value as any)
          );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public ngOnChanges(): void {
    this.writeValue(this.value);
  }

  public setItem(index: number, value: any) {
    const next = [...this.value];
    next[index] = value;
    this.writeValue(next);
    this.onChange(
      this.value.filter((v) => this.allowedValues.includes(v as any))
    );
  }
}
