import { Component, OnInit, Optional } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import {
  getMessaging,
  getToken,
  MessagePayload,
  onMessage,
} from 'firebase/messaging';
import { filter } from 'rxjs';

@Component({
  selector: 'kbru-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected token?: string;
  protected error?: unknown;
  protected messagePayload?: MessagePayload;

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

  public async ngOnInit(): Promise<void> {
    const messaging = getMessaging();
    await Notification.requestPermission();
    getToken(messaging, {
      vapidKey:
        'BBWfj0eWNkhU0At_zun0udQRshWjipxjqlGp7aOdjR19P1mbAze1wbNHWII5KY5xwwN4w-6qj7tKqx0wt5RzulM',
    })
      .then((currentToken) => {
        if (currentToken) {
          this.token = currentToken;
        } else {
          this.token = undefined;
        }
      })
      .catch((err) => {
        this.error = err;
      });
    onMessage(messaging, (payload) => {
      this.messagePayload = payload;
    });
  }
}
