import { ICycleInterface } from "./ICycle.interface";
import { ITransactionInterface } from "./ITransaction.interface";
import { ITravelerInterface } from "./ITraveler.interface";

export interface IBookingInterface {
    id?:number;
    is_paid:boolean;
    cycle:ICycleInterface;
    travelers:ITravelerInterface;
    created_at:string;
    transaction?:ITransactionInterface;

 }
  