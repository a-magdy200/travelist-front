import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import Loader from '../Loader'
import { HeadCellInterface } from '../../config/interfaces/IHeadCell.interface'
import { toast } from 'react-toastify'
import moment from 'moment'

function descendingComparator<Data>(a: Data, b: Data, orderBy: keyof Data) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof ICycleInterface>(
	order: Order,
	orderBy: Key
): (a: ICycleInterface, b: ICycleInterface) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<Data>(
	array: readonly Data[],
	comparator: (a: Data, b: Data) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [Data, number])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

const headCells: readonly HeadCellInterface<ICycleInterface>[] = [
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'ID ',
	},
	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: 'Cycle Name',
	},
	{
		id: 'departure_date',
		numeric: true,
		disablePadding: false,
		label: 'Departure Date',
	},
	{
		id: 'return_arrival_date',
		numeric: true,
		disablePadding: false,
		label: 'Return Arrival Date',
	},
	{
		id: 'departure_location',
		numeric: true,
		disablePadding: false,
		label: 'Departure Location',
	},
	{
		id: 'arrival_location',
		numeric: true,
		disablePadding: false,
		label: 'Arrival Location',
	},

	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'Actions',
	},
]

interface EnhancedTableProps {
	numSelected: number
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof ICycleInterface
	) => void
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
	order: Order
	orderBy: string
	rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props
	const createSortHandler =
		(property: keyof ICycleInterface) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property)
		}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						align="center"
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

const ListCycleComponent = () => {
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof ICycleInterface>('name')
	const [selected, setSelected] = useState<readonly string[]>([])
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [cycles, setCycles] = useState<ICycleInterface[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const getCycles = async () => {
		toast.info('Getting Cycles....')
		setIsLoading(true)
		try {
			const response: IResponseInterface<ICycleInterface[]> = await api<
				ICycleInterface[]
			>({
				url: '/api/cycles/company/all',
			})

			if (response.success) {
				if (response.data) {
					setCycles(response.data)
				}
			}
			toast.success('Getting Cycles Successfully')
		} catch (error: any) {
			toast.error('An error has occurred')
			console.log(error)
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getCycles()
	}, [])

	const removeCycle = async (id: number | undefined) => {
		if (window.confirm('Are you sure?')) {
			console.log(id)
			toast.info('Deleting Cycle....')

			try {
				const response: IResponseInterface<ICycleInterface> =
					await api<ICycleInterface>({
						url: `/api/cycles/delete/${id}`,
						method: 'DELETE',
					})

				if (response.success) {
					toast.success('Deleted Successfully')
				}
			} catch (error: any) {
				toast.error('An error has occurred')
			}
		}
	}

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof ICycleInterface
	) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			return
		}
		setSelected([])
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cycles.length) : 0
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			{cycles ? (
				<div>
					<Box className="listPrograms" sx={{ width: '97%' }}>
						<Paper sx={{ width: '100%', mb: 1 }}>
							<TablePagination
								rowsPerPageOptions={[10, 20, 30]}
								component="div"
								count={cycles.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
							<TableContainer>
								<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
									<EnhancedTableHead
										numSelected={selected.length}
										order={order}
										orderBy={orderBy}
										onSelectAllClick={handleSelectAllClick}
										onRequestSort={handleRequestSort}
										rowCount={cycles.length}
									/>

									<TableBody>
										{stableSort(cycles, getComparator(order, orderBy))
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((cycle: ICycleInterface, index) => {
												return (
													<TableRow>
														<TableCell align="center">{cycle.id}</TableCell>
														<TableCell align="center">{cycle.name}</TableCell>
														<TableCell align="center">
														{moment(cycle.departure_date).format('MMM Do YY')}														</TableCell>
														<TableCell align="center">
														{moment(cycle.return_arrival_date).format('MMM Do YY')}														</TableCell>
														<TableCell align="center">
															{cycle.departure_location}
														</TableCell>
														<TableCell align="center">
															{cycle.arrival_location}
														</TableCell>
														<TableCell align="center">
															<NavLink to={`/cycle/show/${cycle.id}`}>
																<Button
																	className="createButton"
																	variant="contained"
																	color="success"
																>
																	Show
																</Button>
															</NavLink>
															<NavLink to={`/cycle/edit/${cycle.id}`}>
																{' '}
																<Button
																	className="createButton"
																	variant="contained"
																>
																	Edit
																</Button>
															</NavLink>
															<Button
																className="createButton"
																variant="contained"
																color="error"
																onClick={() => {
																	removeCycle(cycle.id)
																}}
															>
																Delete
															</Button>
														</TableCell>
													</TableRow>
												)
											})}
										{emptyRows > 0 && <TableCell colSpan={6} />}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Box>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ListCycleComponent
