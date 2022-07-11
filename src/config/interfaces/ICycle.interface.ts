import {ICountryInterface} from "./ICountry.interface";

export interface ICycleInterface {
    id:number;
    name:string;
    max_seats:number;
    programId:number;
    current_seats:number;
    departure_date:string;
    arrival_date:string;
    return_date:string;
    return_arrival_date:string;
    departure_location:ICountryInterface;
    return_location:ICountryInterface;
    arrival_location:ICountryInterface;
    return_arrival_location:ICountryInterface;
  }
  