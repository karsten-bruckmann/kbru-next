import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'ui-file-input',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
})
export class FileInputComponent implements ControlValueAccessor {
  public filesSelected = new Subject<FileList | null>();

  public value: File | null = null;

  public disabled = false;

  private onChange: (value: File | null) => void = () => {
    return;
  };

  public onTouched: () => void = () => {
    return;
  };

  public valueChanged(files: unknown) {
    let next: File | null = null;
    if (files instanceof FileList) {
      next = files[0] || null;
    } else {
      next = null;
    }

    this.value = next;
    this.onChange(next);
  }

  writeValue(value: unknown): void {
    if (value instanceof File) {
      this.value = value;
    } else {
      this.value = null;
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
}
