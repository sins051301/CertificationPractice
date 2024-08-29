export interface EventInterface {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
}


export interface FormInterface {
    event?: EventInterface;
    method: "post" | "put" | "delete" | "patch";
  }