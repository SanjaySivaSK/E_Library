import { Category } from "./category";
import { Author } from "./author";

export interface  Book {
  id:number,
  book:string,
  category:{
    id:number,
    category:string
  },
  description:string,
  author:{
    id:number,
    author:string;
  },

}



