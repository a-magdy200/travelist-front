export interface ICycleCreateInterface {
    id?:number;
    name?:string;
    max_seats?:number;
    programId?:number;
    current_seats?:number;
    departure_date?:string;
    arrival_date?:string;
    return_date?:string;
    return_arrival_date?:string;
    departureLocationId?:number;
    returnLocationId?:number;
    arrivalLocationId?:number;
    returnArrivalLocationId?:number;
  }