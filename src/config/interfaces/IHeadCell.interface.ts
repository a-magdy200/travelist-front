export interface HeadCellInterface<T> {
	disablePadding: boolean
	id: keyof T
	label: string
	numeric: boolean
}
