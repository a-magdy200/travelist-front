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
    departureLocationId:ICountryInterface;
    returnLocationId:ICountryInterface;
    arrivalLocationId:ICountryInterface;
    returnArrivalLocationId:ICountryInterface;
  }
  