import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  addGroupFormSubmittedAction,
  GroupForm,
  GroupFormService,
} from '@kbru/skat-list/core/group-management';
import { Store } from '@ngrx/store';

@Component({
  selector: 'skat-list-start-page-add-group-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './add-group-form.component.html',
  styleUrls: ['./add-group-form.component.scss'],
})
export class AddGroupFormComponent {
  constructor(
    private store$: Store,
    private groupFormService: GroupFormService
  ) {}

  @Output()
  public added = new EventEmitter<void>();

  @Output()
  public canceled = new EventEmitter<void>();

  protected form$ = this.groupFormService.addForm$;

  public submit(form: GroupForm): void {
    this.store$.dispatch(
      addGroupFormSubmittedAction({ value: form.value, created: new Date() })
    );
    this.added.next();
  }

  public cancel(): void {
    this.canceled.next();
  }
}
