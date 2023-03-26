import { Component, OnInit, Optional } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { filter } from 'rxjs';

@Component({
  selector: 'kbru-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(@Optional() updates?: SwUpdate) {
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

  public ngOnInit(): void {
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        'BBWfj0eWNkhU0At_zun0udQRshWjipxjqlGp7aOdjR19P1mbAze1wbNHWII5KY5xwwN4w-6qj7tKqx0wt5RzulM',
    })
      .then((currentToken) => {
        if (currentToken) {
          alert(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.error('An error occurred while retrieving token. ', err);
      });
    onMessage(messaging, (payload) => {
      alert(JSON.stringify(payload));
    });
  }
}
