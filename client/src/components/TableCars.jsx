// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getTrucks, deleteTruckById, updateTrucksOrder } from "../slices/truckSlice";
import TextField from '@mui/material/TextField';
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
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import IconButton from '@mui/material/IconButton';
import { createApi } from 'unsplash-js';


const truckController = new Truck();

const columns = [
  { id: 'licensePlate', label: 'Placa', minWidth: 170 },
  { id: 'brand', label: 'Marca', minWidth: 170 },
  { id: 'model', label: 'Linea', minWidth: 170 },
  { id: 'year', label: 'Modelo', minWidth: 170 },
  { id: 'actualStatus', label: 'Estado actual', minWidth: 170 },
  { id: 'mileage', label: 'Kilometraje', minWidth: 170 },
  { id: 'actions', label: '', minWidth: 120 }
];

export const TableCars = () => {
  const dispatch = useDispatch();
  const trucks = useSelector((state) => state.truck.trucks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [licensePlate, setLicensePlate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await truckController.getListTrucks();
        dispatch(getTrucks(response));
      } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Confirmación',
      content: '¿Estás seguro de que quieres eliminar este usuario?',
      onOk: async () => {
        try {
          const response = await truckController.deleteTruckById(id);
          if (response.status === 200) {
            dispatch(deleteTruckById(id));
            Modal.success({
              content: 'Usuario eliminado correctamente.',
            });
          } else {
            Modal.error({
              content: 'Ocurrió un error al eliminar el usuario.',
            });
          }
        } catch (error) {
          console.error("Failed to delete user", error);
          Modal.error({
            content: 'Ocurrió un error al eliminar el usuario.',
          });
        }
      },
    });
  };

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData('itemID', item.licensePlate);
  };

  const draggingOver = (evt) => {
    evt.preventDefault();
  };

  const handleRowClick = (truck) => {
    setSelectedTruck(truck);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTruck(null);
  };

  const nextMaintenance = (selectedTruck) => {
    if (!selectedTruck || !selectedTruck.maintenances || selectedTruck.maintenances.length === 0) {
      return [];
    }

    const latestMaintenances = {};

    selectedTruck.maintenances.forEach((maintenance) => {
      const { type, nextDate } = maintenance;

      if (
        !latestMaintenances[type] ||
        new Date(nextDate) > new Date(latestMaintenances[type].nextDate)
      ) {
        latestMaintenances[type] = { type, nextDate };
      }
    });

    return Object.values(latestMaintenances);
  };

  const handleStatusChange = async (event) => {
    const actualStatus = event.target.value;

    const data = {
      licensePlate: selectedTruck.licensePlate,
      actualStatus: actualStatus,
    };
    const response = await truckController.updateTruckStatus(data);
    if (response.status !== 200) {
      Modal.error({
        content: 'Ocurrió un error al editar el estado del camión.',
      });
    } else {
      Modal.success({
        content: 'Camión editado correctamente.',
      })
      const data = await truckController.getListTrucks();
      dispatch(getTrucks(data));
      setIsModalVisible(false);
    }
  }

  const onDrop = (evt, licensePlate) => {
    evt.preventDefault();
    const itemID = evt.dataTransfer.getData('itemID');
    const draggedItemIndex = trucks.findIndex((truck) => truck.licensePlate === itemID);
    const draggedItem = trucks[draggedItemIndex];
    const dropIndex = trucks.findIndex((truck) => truck.licensePlate === licensePlate);

    const updatedTrucks = [...trucks];
    updatedTrucks.splice(draggedItemIndex, 1);
    updatedTrucks.splice(dropIndex, 0, draggedItem);

    dispatch(updateTrucksOrder(updatedTrucks));
  };

  const filteredTrucks = trucks.filter(truck => truck.licensePlate.toLowerCase().includes(licensePlate.toLowerCase()));

  return (
    <>
      <div className='div-filter-cars'>
        <ThemeProvider theme={theme}>
          <TextField sx={{ width: '370px' }} id="licensePlate" label="Placa" variant="outlined" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
        </ThemeProvider>
      </div>
      <div className="div-table-drivers">
        <Paper sx={{ width: '92%', overflow: 'hidden', marginBottom: '100px' }}>
          <TableContainer sx={{ maxHeight: 800, minHeight: 500 }}>
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
                {filteredTrucks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((truck) => {
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
                      onClick={() => handleRowClick(truck)}
                    >
                      {columns.slice(0, -1).map((column) => {
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
                      <TableCell key="actions" style={{ minWidth: 120, width: 120 }}>
                        <IconButton onClick={(event) => handleDelete(truck.id, event)}>
                          <DeleteOutlined />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={filteredTrucks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {selectedTruck && (
          <Modal
            title="Información del Camión"
            visible={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            className="truck-modal"
          >
            <div className="truck-modal-content">
              <div className="truck-modal-image">
                <img src="https://www.nicepng.com/png/detail/412-4121223_diseamos-contenedores-segn-su-carga-camion-hino.png" alt="Imagen del camión" />
              </div>
              <div className="truck-modal-info">
                <p><strong>Placa:</strong> {selectedTruck.licensePlate}</p>
                <p><strong>Marca:</strong> {selectedTruck.brand}</p>
                <p><strong>Línea:</strong> {selectedTruck.model}</p>
                <p><strong>Modelo:</strong> {selectedTruck.year}</p>
                <p><strong>Kilometraje:</strong> {selectedTruck.mileage}</p>
                <p><strong>Estado Actual:</strong></p>
                <select value={selectedTruck.actualStatus} onChange={handleStatusChange}>
                  <option value="En operación">En operación</option>
                  <option value="En mantenimiento">En mantenimiento</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
                {nextMaintenance(selectedTruck).map((maintenance) => (
                  <p key={maintenance.type}>
                    <strong>Próximo mantenimiento de {maintenance.type}:</strong> {new Date(maintenance.nextDate).toLocaleDateString()}
                  </p>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          borderRadius: '15px', 
          '& fieldset': {
            borderRadius: '15px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'black',
          },
        },
      },
    },
  },
});