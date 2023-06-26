import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'wgc-app-navigation',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss'],
})
export class AppNavigationComponent {
  constructor(protected environmentInjector: EnvironmentInjector) {}
}
