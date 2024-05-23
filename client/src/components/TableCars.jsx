import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getTrucks, deleteTruckById, updateTrucksOrder } from "../slices/truckSlice";
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

const unsplash = createApi({
  accessKey: 'Ww_%QY73k}6m4?a',
});

const getImageForTruck = async (brand, model) => {
  try {
    const query = `${brand} ${model}`;
    const result = await unsplash.search.getPhotos({
      query: query,
      page: 1,
      perPage: 1,
    });

    if (result.response.results.length > 0) {
      return result.response.results[0].urls.small;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
};

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

  const [truckImage, setTruckImage] = useState(null);
  const dispatch = useDispatch();
  const trucks = useSelector((state) => state.truck.trucks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);

  useEffect(() => {
    if (selectedTruck) {
      const fetchImage = async () => {
        const imageUrl = await getImageForTruck(selectedTruck.brand, selectedTruck.model);
        setTruckImage(imageUrl);
      };
      fetchImage();
    }
  }, [selectedTruck]);

  React.useEffect(() => {
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
  

  const handleDelete = async (id) => {
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

  return (
    <div className="div-table-drivers">
      <Paper sx={{ width: '92%', overflow: 'hidden', marginBottom: '100px' }}>
        <TableContainer sx={{ maxHeight: 800, minHeight: 500}}>
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
              {trucks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((truck) => {
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
                      <IconButton onClick={() => handleDelete(truck.id)}>
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
          count={trucks.length}
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
        >
          {truckImage && <img src={truckImage} alt={`${selectedTruck.brand} ${selectedTruck.model}`} className="truck-image" />}
          <p><strong>Placa:</strong> {selectedTruck.licensePlate}</p>
          <p><strong>Marca:</strong> {selectedTruck.brand}</p>
          <p><strong>Línea:</strong> {selectedTruck.model}</p>
          <p><strong>Modelo:</strong> {selectedTruck.year}</p>
          <p><strong>Kilometraje:</strong> {selectedTruck.mileage}</p>
          <p><strong>Estado Actual:</strong> {selectedTruck.actualStatus}</p>
        </Modal>
      )}
    </div>
  );
};
