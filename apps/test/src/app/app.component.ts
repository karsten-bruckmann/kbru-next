import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { rosterFileUploaded } from 'roster-management';

@Component({
  selector: 'kbru-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store$: Store) {}

  public onClick() {
    this.store$.dispatch(rosterFileUploaded({ request: { id: 123 } }));
  }
}
