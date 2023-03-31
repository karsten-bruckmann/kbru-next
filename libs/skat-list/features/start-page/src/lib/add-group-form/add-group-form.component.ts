import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  addFormSubmittedAction,
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
    private groupFormService: GroupFormService,
    private modalController: ModalController
  ) {}

  protected form$ = this.groupFormService.addForm$;

  public submit(form: GroupForm): void {
    this.store$.dispatch(addFormSubmittedAction({ value: form.value }));
    this.modalController.dismiss();
  }
}
