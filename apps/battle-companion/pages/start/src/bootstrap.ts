import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { BattleCompanionStartComponent } from './app/battle-companion-start.component';

bootstrapApplication(BattleCompanionStartComponent, {
  providers: [importProvidersFrom()],
});
