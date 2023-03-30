import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  GroupForm,
  GroupFormService,
} from '@kbru/skat-list/core/group-management';

@Component({
  selector: 'skat-list-start-page-add-group-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './add-group-form.component.html',
  styleUrls: ['./add-group-form.component.scss'],
})
export class AddGroupFormComponent {
  constructor(
    private groupFormService: GroupFormService,
    private modalController: ModalController
  ) {}

  protected form$ = this.groupFormService.addForm$;

  public submit(form: GroupForm): void {
    this.groupFormService.submitAddForm(form.value);
    this.modalController.dismiss();
  }
}
