import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { FileInputComponent } from '@kbru/shared/ui/ionic-file-input';
import {
  DataSourceManagementModule,
  dataSourceUrlAddedAction,
} from '@kbru/war-game-companion/core/data-source-management';
import { Store } from '@ngrx/store';
import { BlobReader, BlobWriter, ZipReader } from '@zip.js/zip.js';

export const unzipSingleFileContainer = async (file: File): Promise<File> => {
  const zipFileReader = new BlobReader(file);
  const zipFileWriter = new BlobWriter();
  const zipReader = new ZipReader(zipFileReader);
  const entries = await zipReader.getEntries();
  const firstEntry = entries.shift();
  if (!firstEntry) {
    throw new Error('No file in zipped roster');
  }

  const name = firstEntry.filename;
  const blob: Blob[] = [await firstEntry.getData(zipFileWriter)];

  return new File(blob, name);
};

@Component({
  selector: 'war-game-companion-build-data-sources',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FileInputComponent,
    DataSourceManagementModule,
  ],
  templateUrl: './build-data-sources.component.html',
  styleUrls: ['./build-data-sources.component.scss'],
})
export class BuildDataSourcesComponent {
  constructor(private nav: NavController, private store$: Store) {}

  protected close(): void {
    this.nav.back();
  }

  protected async download(url?: string): Promise<void> {
    if (!url) {
      return;
    }
    this.store$.dispatch(dataSourceUrlAddedAction({ url }));
  }
}