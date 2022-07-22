import {IEnhancedTableHeadProps} from "../../config/interfaces/props/IEnhancedTableProps";
import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EnhancedTableHeadCell from "./EnhancedTableHeadCell";
import TableCell from "@mui/material/TableCell";

const EnhancedTableHead = <T extends any>(props: IEnhancedTableHeadProps<T>) => {
  const {withActions, headCells, onRequestSort, order, orderBy} =
    props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <EnhancedTableHeadCell<T>
            key={headCell.id as string | number}
            headCell={headCell}
            order={order}
            orderBy={orderBy}
            onClick={createSortHandler(headCell.id)}/>
        ))}
        {withActions ? (
          <TableCell
            width={170}
            component={"th"}
            align={"center" }
            padding={"normal"}>
            Actions
          </TableCell>
        ): null}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
