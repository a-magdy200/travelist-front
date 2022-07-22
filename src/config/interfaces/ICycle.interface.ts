import { IProgramInterface } from './IProgram.interface'

export interface ICycleInterface {
	id?: number
	name: string
	max_seats: number
	// programId:number;
	program?: IProgramInterface
	programId?: number
	current_seats?: number
	average_rate?: number
	departure_date: string
	arrival_date: string
	return_date: string
	return_arrival_date: string
	departure_location: string
	return_location: string
	arrival_location: string
	return_arrival_location: string
}
