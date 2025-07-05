import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Checkbox, TableHead } from '@mui/material';
import './style.css';
import { useState } from 'react';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

export interface Candidate {
  name: string;
  mailReceivedDate: string;
  solutionSentDate?: string;
  isBackgroundColorRed?: boolean;
}

interface GridProps {
  source: Candidate[];
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function MuiGrid({ source, selectedRows, setSelectedRows }: GridProps & { selectedRows: number[], setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - source.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    setSelectedRows([]);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setSelectedRows([]);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400, tableLayout: 'fixed' }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell width={20}/>
            <TableCell className="table-header-cell">Name</TableCell>
            <TableCell className="table-header-cell">Mail Received Date</TableCell>
            <TableCell className="table-header-cell">Solution Sent Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? source.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : source
          ).map((row, index) => {
            const isItemSelected = selectedRows.includes(index);
            return (
              <TableRow 
                key={index} 
                data-id={index} 
                style={{
                  backgroundColor: row.isBackgroundColorRed ? "#fbeaea" : "transparent"
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                  />
                </TableCell>
                <TableCell component="th" scope="row" className="table-row-cell">
                  {page * rowsPerPage + index + 1}
                </TableCell> 
                <TableCell component="th" scope="row" className="table-row-cell">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row" className="table-row-cell">
                  {row.mailReceivedDate}
                </TableCell>
                <TableCell component="th" scope="row" className="table-row-cell">
                  {row.solutionSentDate || "-"}
                </TableCell>
              </TableRow>
            );
          })}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 10 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[1, 3, 5, 7, 10, 25, 50, 100,  { label: 'All', value: -1 }]}
              colSpan={5}
              count={source.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
