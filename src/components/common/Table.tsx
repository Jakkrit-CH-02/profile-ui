import { memo, useMemo } from "react";
import { Column, DataType } from "../../lib/@types";
import { ActionTable, Colors, statusOptions } from "../../lib/constants";
// import lng from "../../locales/en/translation.json";
import {
  Box,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { PrimaryButton } from "./Button/PrimaryButton";
import { OutlineButton } from "./Button/OutlineButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pagination } from "./Pagination";

type Props<T> = {
  headerColor?: string;
  columns: Column[];
  rows: T[];
  offset?: number;
  limit?: number;
  total?: number;
  onClickAction?: (data: T, action: ActionTable, index: number) => void;
  onPagination?: (page: number) => void;
  numbered?: boolean;
};

export const Table = <T,>({
  headerColor,
  columns,
  rows,
  offset,
  limit,
  total,
  onClickAction,
  onPagination,
  numbered,
}: Props<T>) => {

  const getData = (
    data: any,
    type: DataType,
    index: number,
    column: Column
  ) => {
    switch (type) {
      case DataType.Text: {
        const truncateStyle = column.truncate
          ? {
              noWrap: true,
              style: { width: `calc(${column.minWidth}px - 3rem)` },
            }
          : {};
        return (
          <Typography variant="subtitle2" {...truncateStyle}>
            {data}
          </Typography>
        );
      }

      case DataType.Status: {
        return (
          <Box display="flex" alignItems="center">
            <FiberManualRecordIcon
              sx={{
                fontSize: 18,
                color: statusOptions.find((s) => s.title === data)?.bdColor,
              }}
            />
            <Typography ml={1} variant="subtitle2">
              {data}
            </Typography>
          </Box>
        );
      }

      case DataType.Component:
        return data;
      case DataType.Action:
        return (data as ActionTable[])?.map((action) => {
          const wrapper = (comp: React.ReactNode, action: ActionTable) => (
            <IconButton
              key={`icon_${action}`}
              onClick={() => {
                onClickAction?.(rows[index], action, index);
              }}
            >
              {comp}
            </IconButton>
          );

          const wrapperButtonPrimary = (title: string, action: ActionTable) => (
            <PrimaryButton
              dataCy={`${action}`}
              color="error"
              size="small"
              onClick={() => {
                onClickAction?.(rows[index], action, index);
              }}
            >
              {title}
            </PrimaryButton>
          );

          const wrapperButtonOutline = (title: string, action: ActionTable) => (
            <OutlineButton
              color="primary"
              onClick={() => {
                onClickAction?.(rows[index], action, index);
              }}
              sx={{ height: 25, color: "rgba(0, 0, 0, 0.87)" }}
              dataCy="review-button-table"
            >
              {title}
            </OutlineButton>
          );

          switch (action) {
            case ActionTable.VIEW:
              return wrapper(<VisibilityIcon sx={{ fontSize: 18 }} />, action);
            case ActionTable.EDIT:
              return wrapper(<ModeEditIcon sx={{ fontSize: 18 }} />, action);
            case ActionTable.DELETE:
              return wrapper(<DeleteIcon sx={{ fontSize: 18 }} />, action);
            case ActionTable.BUTTON_DELETE:
              return wrapperButtonPrimary("Remove", action);
            case ActionTable.REVIEW:
              return wrapperButtonOutline("Review", action);
            default:
              return null;
          }
        });
      default:
        return data;
    }
  };

  const tableColumns = useMemo(() => {
    return numbered
      ? [
          {
            id: "no",
            label: "Number",
            dataType: DataType.Text,
            minWidth: 60,
            enablePinning: true,
            pinningSide: "left",
          } as Column,
          ...columns,
        ]
      : columns;
  }, [numbered, columns]);

  const rowTable = useMemo<T[]>(() => {
    return numbered
      ? (rows.map((row, index) => ({
          no: index + 1 + (offset ?? 0),
          ...(row as object),
        })) as (T & { no?: number })[])
      : rows;
  }, [numbered, offset, rows]);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        width: "100%",
        minWidth: "auto",
        overflow: "hidden",
      }}
    >
      <TableContainer sx={{ backgroundColor: "white" }}>
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  width={column.minWidth}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: headerColor ?? Colors.headTable,
                    color: "#ffffff",
                  }}
                  sortDirection="desc"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowTable.map((row, indexRow) => {
              const rowKey = (row as any).id ?? indexRow;
              return (
                <TableRow key={rowKey} hover>
                  {tableColumns.map((column) => (
                    <TableCell key={rowKey}>
                      {getData(
                        (row as { [k: string]: string })[column.id],
                        column.dataType,
                        indexRow,
                        column
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {!!total && total !== 0 && (
        <Box
          sx={{
            bgcolor: "#ffffff",
            padding: "16px 16px",
            borderRadius: "0 0 5px 5px",
          }}
        >
          <Pagination
            offset={offset || 0}
            limit={limit || 10}
            total={total || 10}
            onPagination={onPagination}
          />
        </Box>
      )}
    </Paper>
  );
};

const MemoizedTable = memo(Table);
export default MemoizedTable;
