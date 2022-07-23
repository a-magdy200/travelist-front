import * as React from 'react'
import { useEffect, useState } from 'react'
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
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import Loader from '../Loader'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { HeadCellInterface } from '../../config/interfaces/IHeadCell.interface'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

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

function getComparator<Key extends keyof IProgramInterface>(
	order: Order,
	orderBy: Key
): (a: IProgramInterface, b: IProgramInterface) => number {
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

const headCells: readonly HeadCellInterface<IProgramInterface>[] = [
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
		label: 'Program Name',
	},
	{
		id: 'company',
		numeric: true,
		disablePadding: false,
		label: 'Company Name',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Price',
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
		property: keyof IProgramInterface
	) => void
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
	order: Order
	orderBy: string
	rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props
	const createSortHandler =
		(property: keyof IProgramInterface) =>
		(event: React.MouseEvent<unknown>) => {
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

const ListProgramComponent = () => {
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof IProgramInterface>('name')
	const [selected, setSelected] = useState<readonly string[]>([])
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [programs, setPrograms] = useState<IProgramInterface[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const getPrograms = async () => {
		toast.info('Getting Programs....')
		setIsLoading(true)
		try {
			const response: IResponseInterface<IProgramInterface[]> = await api<
				IProgramInterface[]
			>({
				url: '/api/programs/company/programs',
			})

			if (response.success) {
				if (response.data) {
					setPrograms(response.data)
				}
			}
			toast.success('Get Programs Successfully')
		} catch (error: any) {
			console.log(error)
			toast.error('An error has occurred')
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getPrograms()
	}, [])
	const removeProgram = async (id: number | undefined) => {
		if (window.confirm('Are you sure?')) {
			toast.info('Deleting Programs....')
			try {
				const response: IResponseInterface<IProgramInterface> =
					await api<IProgramInterface>({
						url: `/api/programs/delete/${id}`,
						method: 'DELETE',
					})

				if (response.success) {
					setPrograms((previous) =>
						previous.filter((program: IProgramInterface) => program.id !== id)
					)
				}
				toast.success('Deleted Program Successfully.')
			} catch (error: any) {
				toast.error('An error has occurred')
				console.log(error)
			}
		}
	}
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof IProgramInterface
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
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - programs.length) : 0
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			{programs ? (
				<div>
					<Box display={'flex'} alignItems={'center'} mb={2}>
						<Typography variant={'h4'}>My Company Programs</Typography>
						<Box ml={2}>
							<NavLink to={`/program/create`}>
								<Button variant="contained">Create</Button>
							</NavLink>
						</Box>
					</Box>
					<Box>
						<Paper
							sx={{ width: '100%', mb: 1 }}
							elevation={0}
							variant={'outlined'}
						>
							<TablePagination
								rowsPerPageOptions={[10, 20, 30]}
								component="div"
								count={programs.length}
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
										rowCount={programs.length}
									/>
									<TableBody>
										{stableSort(programs, getComparator(order, orderBy))
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((program: IProgramInterface, index) => {
												return (
													<TableRow>
														<TableCell align="center">{program.id}</TableCell>
														<TableCell align="center">{program.name}</TableCell>
														<TableCell align="center">
															{program.company?.user?.name}
														</TableCell>
														<TableCell align="center">
															{program.price}
														</TableCell>
														<TableCell align="center">
															<NavLink to={`/program/show/${program.id}`}>
																<Button
																	className="createButton"
																	variant="contained"
																	color="success"
																>
																	Show
																</Button>
															</NavLink>
															<NavLink to={`/program/edit/${program.id}`}>
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
																onClick={async () => {
																	await removeProgram(program.id)
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
export default ListProgramComponent
