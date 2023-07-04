export type SelectionReference = {
  id: string;
  name: string;
  type: 'selectionEntry' | 'selectionEntryGroup' | 'upgrade' | 'model' | 'unit';
  referenceType: 'entryLink' | 'selectionEntry' | 'sharedSelectionEntry';
};
