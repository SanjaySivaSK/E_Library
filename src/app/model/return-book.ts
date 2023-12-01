export interface ReturnBook {
    id: number;
  appUser: {
    id: number;
    name: string;
  };
  book: {
    id: number;
    book: string;
  };
  returned: boolean;
}
