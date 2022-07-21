import { ICycleInterface } from './ICycle.interface'

export interface HeadCellCycleInterface {
	disablePadding: boolean
	id: keyof ICycleInterface
	label: string
	numeric: boolean
}
