import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Trip } from '../request/trip';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const tripController = new Trip();

const columns = [
  { id: 'originPlace', label: 'Origen', minWidth: 170 },
  { id: 'destinationPlace', label: 'Destino', minWidth: 170 },
  { id: 'completed', label: 'Estado', minWidth: 170 },
];

export const TableRoutes = () => {
  const [trips, setTrips] = React.useState([]);
  const [tripsReal, setTripsReal] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [selectedTrip, setSelectedTrip] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [mapIsLoaded, setIsMapsLoaded] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await tripController.getList();
        setTrips(tripData);
        setTripsReal(tripData);
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

  const handleOpen = (tripId) => {
    const selected = tripsReal.find(trip => trip.id === tripId);
    setSelectedTrip(selected);
    setOpen(true);
    setResponse(null); 
  };

  const handleClose = () => {
    setSelectedTrip(null);
    setOpen(false);
    setIsMapsLoaded(false);
  };

  React.useEffect(() => {
    if (selectedTrip && window.google && window.google.maps ) {
      const directionsService = new window.google.maps.DirectionsService();
      try {
        const origin = JSON.parse(selectedTrip.originPlace);
        const destination = JSON.parse(selectedTrip.destinationPlace);
  
        if (origin && destination) {
          console.log('Origin:', origin);
          console.log('Destination:', destination);
          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setResponse(result);
              } else {
                console.error(`Error fetching directions: ${status}`);
              }
            }
          );
        } else {
          console.error('Error: origin or destination is null or undefined');
        }
      } catch (error) {
        console.error('Error parsing origin or destination places', error);
      }
    } else {
      console.log('Google Maps not available or selectedTrip is null or undefined');
    }
  }, [selectedTrip, mapIsLoaded]);  

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await tripController.getList();
        setTripsReal(tripData);
        const tripsWithLocationNames = await Promise.all(tripData.map(async trip => {
          const originName = await parseLocation(trip.originPlace);
          const destinationName = await parseLocation(trip.destinationPlace);
          const completed = await trip.completed;
          return { ...trip, originPlace: originName, destinationPlace: destinationName, completed: completed };
        }));
        setTrips(tripsWithLocationNames);
      } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
      }
    };
    fetchData();
  }, []);

  const parseLocation = async (location) => {
    try {
      const locObj = JSON.parse(location);

      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locObj.lat},${locObj.lng}&key=AIzaSyAf2AHLtGvjMJouKecs0kkw1AQw2YTZfdc`);
      const data = await response.json();
  
      if (data.status === 'OK') {
        return data.results[0].formatted_address;
      } else {
        console.error('Error al obtener la dirección:', data.status);
        return 'Error al obtener la dirección';
      }
    } catch (error) {
      console.error('Error al analizar la ubicación:', error);
      return 'Ubicación inválida';
    }
  };

  return (
    <>
      <div className='div-tittle-routes'>
        <h3>Rutas</h3>
      </div>
      <div className='div-table-routes'>
        <Paper sx={{ width: '92%', overflow: 'hidden', marginBottom: '100px' }}>
          <TableContainer sx={{ maxHeight: 800, minHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth, width: column.minWidth, backgroundColor: 'rgb(54,54,54)', color: 'white' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {trips
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((trip) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={trip.id}
                        onClick={() => handleOpen(trip.id)}
                      >
                        {columns.map((column) => {
                          const value = trip[column.id];
                          return (
                            <TableCell key={column.id} style={{ minWidth: column.minWidth, width: column.minWidth }}>
                              {column.id === 'completed'
                                ? value
                                  ? <CheckCircleIcon />
                                  : <CancelIcon />
                                : column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
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
            count={trips.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ruta
          </Typography>
          <Typography>
            {selectedTrip && (
              <p>Distancia de la ruta: {selectedTrip.distance}km</p>
            )}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedTrip && (
             <LoadScript googleMapsApiKey="AIzaSyAf2AHLtGvjMJouKecs0kkw1AQw2YTZfdc" onLoad={() => setIsMapsLoaded(true)}>
             <div className='div-map-route'>  
               <GoogleMap
                 id='direction-example'
                 mapContainerStyle={{
                   height: "50vh",
                   width: "100%"
                 }}
                 zoom={8}
                 center={{
                   lat: 5.06889,
                   lng: -75.51738
                 }}
               >
                 {
                   response !== null && (
                     <DirectionsRenderer
                       options={{
                         directions: response
                       }}
                     />
                   )
                  }
               </GoogleMap>
             </div>
           </LoadScript>
            )}
          </Typography>
          <div className="button-create-truck">
              <Button
                variant="contained"
                disableElevation
                onClick={() => setOpen(false)}
              >
                Cerrar
              </Button>
            </div>
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};