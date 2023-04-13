import { Component, EnvironmentInjector, Optional } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Component({
  selector: 'kbru-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    protected environmentInjector: EnvironmentInjector,
    @Optional() private updates?: SwUpdate
  ) {
    updates?.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(() => {
        if (confirm('Neue App-Version verfügbar. Jetzt neu laden?')) {
          updates.activateUpdate().then(() => document.location.reload());
        }
      });
  }
}
