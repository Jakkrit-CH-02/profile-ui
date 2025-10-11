import {
  styled,
  Box,
  // Avatar as MuiAvatar,
  Pagination as PaginationMUI,
  Stack, TableRow as MuiTableRow, Typography
} from "@mui/material";
import { Colors } from "../../lib/constants";

export const TableRow = styled(MuiTableRow)`
    &:hover {
      background-color: ${Colors.rowHover};
    }
  `;

export const getIndexPage = ({ offset, limit, total }: {
  offset: number
  limit: number
  total: number
}) => {
  const to = offset + limit
  if (!total) {
    return {
      start: 0,
      end: 0,
      overall: 0
    }
  }
  return {
    start: total === 0 ? 0 : offset / limit * limit + 1,
    end: to <= total ? to : total,
    overall: total
  }
}

export type Props = {
  offset?: number
  limit?: number
  total?: number
  list?: number[]
  page?: number
  onPagination?: (value: any) => void
  showOnlyPaging?: boolean
}

export const Pagination = ({
  list = [10, 15, 30],
  offset = 0,
  limit = list[0],
  total = 0,
  onPagination,
}: Props) => {
  const { start, end, overall } = getIndexPage({ offset, limit, total })
  const count = Math.ceil(overall / limit)
  const page = (offset / limit) + 1

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="body2" color={Colors.caption}>
        Showing {start} to {end} of {overall} entries
      </Typography>
      <Stack spacing={2}>
        <PaginationMUI
          count={count}
          page={page}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={(_e, value) => page !== value && onPagination?.(value)}
        />
      </Stack>
    </Box>
  )
}
