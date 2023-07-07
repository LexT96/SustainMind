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
  createData("06.07.2023", 61, "6.0"),
  createData('08.06.2023', 40, "9.0"),
  createData('01.06.2023', 23, ""),
  createData('25.05.2023', 20, ""),
  createData('22.04.2023', 8, ""),
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
                <img src={"/pdf.png"} className="h-8 w-8 ml-auto cursor-pointer"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}