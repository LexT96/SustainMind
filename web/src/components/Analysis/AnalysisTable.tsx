import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { API_URL } from '../../config';


export function AnalysisTable({riskAnalysis}: {riskAnalysis: any}) {
  const sortedRiskAnalysis = riskAnalysis.sort((a: any, b: any) => {
    return dayjs(b.date).diff(dayjs(a.date));
  })
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
          {sortedRiskAnalysis.map((row: any) => (
            <TableRow
              key={row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {dayjs(row.date).format("DD.MM.YYYY")}
              </TableCell>
              <TableCell align="center">{row.numberOfSuppliers}</TableCell>
              <TableCell align="right">
                <a href={API_URL + "/" + row.path}>
                  <img
                    src={"/pdf.png"}
                    className="h-8 w-8 ml-auto cursor-pointer"
                  />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}