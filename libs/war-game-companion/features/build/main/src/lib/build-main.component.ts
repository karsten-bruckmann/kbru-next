import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'war-game-companion-build-main',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './build-main.component.html',
  styleUrls: ['./build-main.component.scss'],
})
export class BuildStartPageComponent {}
