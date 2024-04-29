import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const TableCars = () => {
    const rows = [
        { placa: 'ABC123', marca: 'Marca1', linea1: 'Linea1', modeloB0: 'Modelo1', estadoActual: 'En operación', kilometraje1: 350000, mPreventivo1: "En 30 dias", legales1: false },
        { placa: 'DEF456', marca: 'Marca2', linea1: 'Linea2', modeloB0: 'Modelo2', estadoActual: 'En mantenimiento', kilometraje1: 200000, mPreventivo1: "En 30 dias", legales1: true },
        { placa: 'GHI789', marca: 'Marca3', linea1: 'Linea3', modeloB0: 'Modelo3', estadoActual: 'Fuera de servicio', kilometraje1: 500000, mPreventivo1: "En 30 dias", legales1: false },
      ];
  return (
    <Box sx={{ margin: '0 40px' }}>
        <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow sx={{ backgroundColor: 'grey'}}>
                <TableCell>Placa</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Linea</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Estado actual</TableCell>
                <TableCell>Kilometraje</TableCell>
                <TableCell>M. Preventivo</TableCell>
                <TableCell>Legales</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow key={row.placa}>
                <TableCell>{row.placa}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.linea1}</TableCell>
                <TableCell>{row.modeloB0}</TableCell>
                <TableCell>
                    <Box display="flex" alignItems="center" >
                        {row.estadoActual === 'En operación' && <FiberManualRecordIcon color="success" sx={{width: '20px'}}/>}
                        {row.estadoActual === 'En mantenimiento' && <FiberManualRecordIcon color="warning" sx={{width: '20px'}}/>}
                        {row.estadoActual === 'Fuera de servicio' && <FiberManualRecordIcon color="error" sx={{width: '20px'}}/>}
                        {'\u00A0'}{row.estadoActual}
                    </Box>
                </TableCell>
                <TableCell>{row.kilometraje1}</TableCell>
                <TableCell>{row.mPreventivo1}</TableCell>
                <TableCell>
                    {row.legales1 ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
}
