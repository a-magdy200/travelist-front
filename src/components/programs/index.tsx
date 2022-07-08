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
): (
	a: IProgramInterface,
	b: IProgramInterface
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

interface HeadCell {
	disablePadding: boolean
	id: keyof IProgramInterface
	label: string
	numeric: boolean
}

const headCells: readonly HeadCell[] = [
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
		(property: keyof IProgramInterface) => (event: React.MouseEvent<unknown>) => {
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

const ListProgramComponent=()=> {
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof IProgramInterface>('name')
	const [selected, setSelected] = useState<readonly string[]>([])
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [programs, setPrograms] = useState([])

	useEffect(() => {
		fetch('http://localhost:4000/programs/all')
			.then((response) => {
				return response.json()
			})
			.then((res) => {
				setPrograms(res.data)
				console.log(res.data)
			})
			.catch((e) => {
				console.log(e)
			})
	}, [])
	const removeProgram = (id: number) => {
		if (window.confirm('Are you sure?')) {
			console.log(id)
			fetch('http://localhost:4000/programs/delete/' + id, {
				method: 'DELETE',
			})
				.then((res) => console.log(res))
				.catch((err) => console.log(err))
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
			// const newSelecteds = programs.map((n) => n.program_name);
			// setSelected(newSelecteds);
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

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - programs.length) : 0

	return (
		<div>
            programs?
			<NavLink to={`/program/create`}>
				{' '}
				<Button className="createButton" variant="contained">
					Create
				</Button>
			</NavLink>
			<Box className="listPrograms" sx={{ width: '97%' }}>
				<Paper sx={{ width: '100%', mb: 1 }}>
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
								{/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
								{stableSort(programs, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((program: IProgramInterface, index) => {
										return (
											<TableRow>
												<TableCell align="center">{program.id}</TableCell>
												<TableCell align="center">{program.name}</TableCell>
												<TableCell align="center">
													{program.company?.id}
												</TableCell>
												<TableCell align="center">{program.price}</TableCell>
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
														onClick={() => {
															removeProgram(program.id)
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
            :
            <Loader/>
		</div>
	)
}
export default ListProgramComponent;