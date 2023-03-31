import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicListInputComponent } from '@kbru/shared/ui/ionic-list-input';
import {
  SkatListFormService,
  SkatListManagementModule,
} from '@kbru/skat-list/core/skat-list-management';

@Component({
  selector: 'skat-list-group-page-add-list-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IonicListInputComponent,
    ReactiveFormsModule,
    SkatListManagementModule,
  ],
  templateUrl: './add-list-form.component.html',
  styleUrls: ['./add-list-form.component.scss'],
})
export class AddListFormComponent {
  constructor(private skatListFormService: SkatListFormService) {}

  protected form$ = this.skatListFormService.form$;

  public getPlayerName(id: string): string {
    return id.toUpperCase();
  }

  public getPlaceholder(index: number): string {
    switch (index) {
      case 0:
        return '1. Spieler (Geber)';
      default:
        return `${index + 1}. Spieler`;
    }
  }
}
