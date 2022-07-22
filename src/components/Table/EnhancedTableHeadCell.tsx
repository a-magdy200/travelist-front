import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {IEnhancedTableHeadCellProps} from "../../config/interfaces/props/IEnhancedTableProps";

const EnhancedTableHeadCell = <T extends any>({headCell, order, orderBy, onClick}: IEnhancedTableHeadCellProps<T>) => {
  return (
    <TableCell
      align={headCell.centered ? "center" : "left"}
      padding={"normal"}
      component={"th"}
      sortDirection={orderBy === headCell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : "asc"}
        onClick={onClick}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
}
export default EnhancedTableHeadCell;
