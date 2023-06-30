import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  date: string,
  number: number,
  link: string,
) {
  return { date, number, link};
}

const rows = [
  createData('Frozen yoghurt', 159, "6.0"),
  createData('Ice cream sandwich', 237, "9.0"),
  createData('Eclair', 262, ""),
  createData('Cupcake', 305, ""),
  createData('Gingerbread', 356, ""),
];

export function AnalysisTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Number of suppliers analyzed</TableCell>
            <TableCell align="right">Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="center">{row.number}</TableCell>
              <TableCell align="right">
                <img src={"../../../public/pdf.png"} className="h-8 w-8 ml-auto cursor-pointer"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}