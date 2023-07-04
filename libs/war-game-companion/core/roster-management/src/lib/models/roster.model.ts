export interface Roster {
  id: string;
  name: string;
  catalogueId: string;
  forces: {
    id: string;
    name: string;
  }[];
}
