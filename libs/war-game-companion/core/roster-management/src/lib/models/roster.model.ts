export interface Roster {
  id: string;
  name: string;
  gameSystemId: string;
  forces: {
    id: string;
    name: string;
    catalogueId: string;
  }[];
}
