export interface Roster {
  id: string;
  name: string;
  repositoryName: string;
  forces: {
    id: string;
    name: string;
    catalogueId: string;
  }[];
}
