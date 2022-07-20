import { ICycleInterface } from "./ICycle.interface";
import { ITravelerInterface } from "./ITraveler.interface";

export interface IBookingInterface {
    id?:number;
    is_paid:number;
    cycle:ICycleInterface;
    traveler:ITravelerInterface;
    

 }
  