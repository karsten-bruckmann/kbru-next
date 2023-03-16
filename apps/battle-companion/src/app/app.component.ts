import { Component, EnvironmentInjector, Optional } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, IonicModule],
  selector: 'kbru-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public environmentInjector: EnvironmentInjector,
    @Optional() updates?: SwUpdate
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
