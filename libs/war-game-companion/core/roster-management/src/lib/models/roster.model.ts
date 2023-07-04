export interface Roster {
  id: string;
  name: string;
  catalogueId: string;
  forces: {
    id: string;
    name: string;
    categories: {
      name: string;
      id: string;
      entries: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
}
