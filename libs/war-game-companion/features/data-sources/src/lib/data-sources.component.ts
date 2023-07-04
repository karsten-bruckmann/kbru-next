import { Component } from '@angular/core';
import {
  dataIndexSelector,
  LoadGameDefinitionForm,
  LoadGameDefinitionService,
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
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss'],
})
export class DataSourcesComponent {
  constructor(
    private loadGameDefinitionService: LoadGameDefinitionService,
    private store$: Store
  ) {}

  protected form$ = this.loadGameDefinitionService.form$;

  protected dataIndex$ = this.store$.select(dataIndexSelector);

  protected async submit(form: LoadGameDefinitionForm): Promise<void> {
    this.loadGameDefinitionService.submit(form);
  }
}
