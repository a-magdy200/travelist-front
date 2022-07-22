import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Order} from "../../config/helpers/types";
import {IEnhancedTableHeadCell, IEnhancedTableProps, TableData} from "../../config/interfaces/props/IEnhancedTableProps";
import {getComparator} from "../../config/helpers/functions";
import EnhancedTableHead from "./EnhancedTableHead";
import IconButton from "@mui/material/IconButton";
import {CloseOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import {Grid} from "@mui/material";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import {useState} from "react";

const EnhancedTable = <T extends TableData>({
    data,
    headCells,
    onViewClick,
    onEditClick,
    onDeleteClick,
    withActions
  }: IEnhancedTableProps<T>) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState({
    isOpen: false,
    rowId: 0
  })
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDeleteConfirm = (row: T) => {
    setDeleteConfirmModalState({
      isOpen: true,
      rowId: row.id,
    })
  }
  const closeDeleteConfirm = () => {
    setDeleteConfirmModalState({
      isOpen: false,
      rowId: 0,
    })
  }
  const confirmDelete = async () => {
    if (onDeleteClick) {
      await onDeleteClick(deleteConfirmModalState.rowId);
    }
    closeDeleteConfirm();
  }
  // Avoid a layout jump when reaching the last page with empty data.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              withActions={withActions}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {data.sort(getComparator<T>(order, orderBy as keyof T))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: T) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      {headCells.map((headCell: IEnhancedTableHeadCell<T>) => (
                        <TableCell key={headCell.id as string} align="left">
                          {row[headCell.id] as unknown as string | number}
                        </TableCell>
                      ))}
                      <TableCell align={"center"}>
                        {withActions ? (
                          <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>

                            {onViewClick ? (
                              <Grid item>
                                <IconButton color={"primary"} onClick={() => onViewClick(row)}><EyeOutlined/></IconButton>
                              </Grid>
                            ) : null}

                            {onEditClick ? (
                              <Grid item>
                                <IconButton color={"secondary"} onClick={() => onEditClick(row)}><EditOutlined/></IconButton>
                              </Grid>
                            ) : null}

                            {onDeleteClick ? (
                              <Grid item>
                                <IconButton color={"error"} onClick={() => openDeleteConfirm(row)}><CloseOutlined/></IconButton>
                              </Grid>
                            ) : null}

                            </Grid>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 ? (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
        <ConfirmDeleteModal
          isOpen={deleteConfirmModalState.isOpen}
          close={closeDeleteConfirm}
          submit={confirmDelete}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
export default EnhancedTable
