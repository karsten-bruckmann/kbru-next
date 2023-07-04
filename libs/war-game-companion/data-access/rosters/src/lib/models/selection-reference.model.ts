export type SelectionReference = {
  id: string;
  type: 'selectionEntry' | 'selectionEntryGroup' | 'upgrade' | 'model' | 'unit';
  referenceType: 'entryLink' | 'selectionEntry' | 'sharedSelectionEntry';
};
