import React from 'react';
import { Truck } from '../request/trucks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const truckController = new Truck();

export const TableCars = () => {
    const [trucks, setTrucks] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await truckController.getListTrucks();
            const data = await response.json();
            setTrucks(data);
          } catch (error) {
            console.error('Hubo un error al cargar los datos:', error);
          }
        };
        fetchData();
      }, []);

  return (
    <Box sx={{ margin: '0 40px' }}>
        <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow className='table-head'>
                <TableCell sx={{ color: 'white'}}>Placa</TableCell>
                <TableCell sx={{ color: 'white'}}>Marca</TableCell>
                <TableCell sx={{ color: 'white'}}>Linea</TableCell>
                <TableCell sx={{ color: 'white'}}>Modelo</TableCell>
                <TableCell sx={{ color: 'white'}}>Estado actual</TableCell>
                <TableCell sx={{ color: 'white'}}>Kilometraje</TableCell>
                <TableCell sx={{ color: 'white'}}>M. Preventivo</TableCell>
                <TableCell sx={{ color: 'white'}}>Legales</TableCell>
            </TableRow>
            </TableHead>
            <TableBody className='table-body'>
                {trucks && trucks.map((row) => (
                    <TableRow key={row.licensePlate}>
                    <TableCell>{row.licensePlate}</TableCell>
                    <TableCell>{row.brand}</TableCell>
                    <TableCell>{row.model}</TableCell>
                    <TableCell>{row.year}</TableCell>
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
