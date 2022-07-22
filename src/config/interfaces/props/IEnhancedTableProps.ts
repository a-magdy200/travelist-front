import * as React from 'react'
import { Order } from '../../helpers/types'

export interface IEnhancedTableProps<T> {
	data: T[]
	headCells: IEnhancedTableHeadCell<T>[]
	withActions?: boolean
	onViewClick?: (row: T) => void
	onDeleteClick?: (id: number) => void
	onEditClick?: (row: T) => void
}

export interface IEnhancedTableToolbarProps {
	numSelected: number
}
export interface IEnhancedTableHeadProps<T> {
	withActions?: boolean
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
	order: Order
	orderBy: keyof T
	headCells: IEnhancedTableHeadCell<T>[]
}
export interface IEnhancedTableHeadCellProps<T> {
	headCell: IEnhancedTableHeadCell<T>
	order: Order
	orderBy: keyof T
	onClick?: (event: React.MouseEvent<unknown>) => void
}
export interface IEnhancedTableHeadCell<T> {
	id: keyof T
	centered?: boolean
	label: string
}
export interface TableData {
	id: number
}
