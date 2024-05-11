import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Truck } from '../request/trucks';

const truckController = new Truck();

const columns = [
  { id: 'licensePlate', label: 'Placa', minWidth: 170 },
  { id: 'brand', label: 'Marca', minWidth: 170 },
  { id: 'model', label: 'Linea', minWidth: 170 },
  { id: 'year', label: 'Modelo', minWidth: 170 },
  { id: 'actualStatus', label: 'Estado actual', minWidth: 170 },
  { id: 'mileage', label: 'Kilometraje', minWidth: 170 },
  { id: 'placa', label: 'M. Preventivo', minWidth: 170 },
  { id: 'name', label: 'Legales', minWidth: 170 },
];

export const TableCars = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [trucks, setTrucks] = useState([]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData('itemID', item.licensePlate);
  };

  const draggingOver = (evt) => {
    evt.preventDefault();
  };

  const onDrop = (evt, licensePlate) => {
    evt.preventDefault();
    const itemID = evt.dataTransfer.getData('itemID');
    const draggedItemIndex = trucks.findIndex((truck) => truck.licensePlate === itemID);
    const draggedItem = trucks[draggedItemIndex];
    const dropIndex = trucks.findIndex((truck) => truck.licensePlate === licensePlate);

    const updatedTrucks = [...trucks];
    updatedTrucks.splice(draggedItemIndex, 1);
    updatedTrucks.splice(dropIndex, 0, draggedItem);

    setTrucks(updatedTrucks);
  };

  return (
    <div className="div-table-drivers">
      <Paper sx={{ width: '92%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      width: column.minWidth,
                      backgroundColor: 'rgb(54,54,54)',
                      color: 'white',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {trucks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((truck, index) => {
                let statusColor = 'disabled';
                if (truck.actualStatus === 'En operación') {
                  statusColor = 'success';
                } else if (truck.actualStatus === 'En mantenimiento') {
                  statusColor = 'warning';
                } else if (truck.actualStatus === 'Fuera de servicio') {
                  statusColor = 'error';
                }
                return (
                  <TableRow
                    key={truck.licensePlate}
                    draggable
                    onDragStart={(evt) => startDrag(evt, truck)}
                    onDragOver={draggingOver}
                    onDrop={(evt) => onDrop(evt, truck.licensePlate)}
                  >
                    {columns.map((column) => {
                      const value = truck[column.id];
                      return (
                        <TableCell key={column.id} style={{ minWidth: column.minWidth, width: column.minWidth }}>
                          {column.id === 'actualStatus' ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <FiberManualRecordIcon color={statusColor} sx={{ width: '15px' }} />
                              {'\u00A0'}
                              {value}
                            </div>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={trucks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
