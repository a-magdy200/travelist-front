import { IHotelInterface } from "./IHotel.interface";

export interface IHotelListProps {
	hotels: IHotelInterface[];
	setFilteredHotels?: any;
}