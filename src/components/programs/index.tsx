import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import {  NavLink } from "react-router-dom";

interface Data {
    id: number;
    program_name: string;
    company_name: string;
    country: string;
    status: string;
}

function createData(
    id: number,
    program_name: string,
    company_name: string,
    country: string,
    status: string
): Data {
  return {
    id,
    program_name,
    company_name,
    country,
    status

  };
}

const rows = [
  createData(1,"p1","c1","Egypt","open"),
  createData(2,"p2","c2","Egypt","open"),
  createData(3,"p3","c3","Egypt","closed"),
  createData(4,"p4","c4","Egypt","closed"),
  createData(5,"p5","c5","Egypt","open"),
  createData(6,"p6","c6","Egypt","open"),
  createData(7,"p7","c7","Egypt","closed"),
  createData(8,"p8","c8","Egypt","open"),
  createData(9,"p9","c9","Egypt","open"),
  createData(10,"p10","c10","Egypt","closed"),
  createData(11,"p11","c11","Egypt","open"),
  createData(12,"p12","c12","Egypt","open"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id:'id',
    numeric: true,
    disablePadding: false,
    label: 'ID ',
  },
  {
    id: 'program_name',
    numeric: true,
    disablePadding: false,
    label: 'Program Name',
  },
  {
    id: 'company_name',
    numeric: true,
    disablePadding: false,
    label: 'Company Name',
  },
  {
    id: 'country',
    numeric: true,
    disablePadding: false,
    label: 'Destination',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

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
  );
}


export default function ListPrograms() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('program_name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.program_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
   <NavLink to={`/create`}> <Button className="createButton" variant="contained">Create</Button></NavLink>
    <Box className="listPrograms" sx={{ width: '97%' }}>
      <Paper sx={{ width: '100%', mb: 1 }}>
      <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                
                    <TableRow>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.program_name}</TableCell>
                      <TableCell align="center">{row.company_name}</TableCell>
                      <TableCell align="center">{row.country}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <Button className="createButton" variant="contained" color="success">Show</Button> 
                        <Button className="createButton" variant="contained">Edit</Button> 
                        <Button className="createButton" variant="contained" color="error">Delete</Button> 
                      </TableCell>
                     </TableRow>
                  
                  );
                })}
              {emptyRows > 0 && (
               
                  <TableCell colSpan={6} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
     
    </Box>
    </div>
  );
}
