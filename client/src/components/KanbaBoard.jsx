import React, { useState, useEffect } from 'react';
import { Trip } from '../request/trip';
import { User } from '../request/users';
import { Truck } from '../request/trucks';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Modal as AntdModal } from 'antd';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { Autocomplete } from '@mui/material';
import FormControl from '@mui/material/FormControl';

const tripController = new Trip();
const userController = new User();
const truckController = new Truck();

export const KanbaBoard = () => {
    const [trips, setTrips] = useState([]);
    const [parsedLocations, setParsedLocations] = useState({});
    const [userId, setUserId] = useState("");
    const [date, setDate] = React.useState(dayjs());
    const [licensePlates, setLicensePlates] = React.useState("");
    const [licensePlate, setLicensePlate] = React.useState("");
    const [brand, setBrand] = React.useState("");
    const [model, setModel] = React.useState("");
    const [truckId, setTruckId] = React.useState("");
    const miCookie = Cookies.get('jwt');

    useEffect(() => {
        userController.verifyToken(miCookie)
        .then(data => data.json())
        .then(response => {
            if(response.user){
                setUserId(response.user.user.id);
            }
        })
        .catch(error => {
            console.error(error); 
        });
    }, [miCookie]);

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await truckController.getListLicensePlates();
            setLicensePlates(response);
          } catch (error) {
            console.error('Hubo un error al cargar los datos:', error);
          }
        };
        fetchData();
      }, []);

      React.useEffect(() => {
        const fetchData = async () => {
          if (licensePlate) {
            try {
              const response = await truckController.getTruckByLicencePlate(licensePlate);
              setBrand(response.brand);
              setModel(response.model);
              setTruckId(response.id);
            } catch (error) {
              console.error('Hubo un error al obtener los datos del usuario:', error);
            }
          }
        };
        fetchData();
      }, [licensePlate]); 
    
      const handleChangeLicensePlate = (event, newValue) => {
        setLicensePlate(newValue);
      };

    useEffect(() => {
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

        const parseLocations = async (trips) => {
            const locations = {};
            for (const trip of trips) {
                const waypoints = trip.waypoints ? await Promise.all(trip.waypoints.map(parseLocation)) : [];
                locations[trip.id] = {
                    origin: await parseLocation(trip.originPlace),
                    destination: await parseLocation(trip.destinationPlace),
                    waypoints,
                };
            }
            setParsedLocations(locations);
        };

        const fetchData = async () => {
            try {
                await parseLocations(trips);
            } catch (error) {
                console.error('Hubo un error al cargar los datos:', error);
            }
        };
        fetchData();
    }, [trips]);

    const startDrag = (evt, item) => {
        evt.dataTransfer.setData('itemID', item.id);
    }

    const draggingOver = (evt) => {
        evt.preventDefault();
    }

    const updateTrip = async (trip) => {
        console.log(trip);
        try {
            const data = {
                id: trip.id,
                completed: true,
              };
            
              const response = await tripController.updateTrip(data);
            
              if (response.status === 200) {
                AntdModal.success({
                  content: 'Ruta completada correctamente.',
                });
              } else {
                AntdModal.error({
                  content: 'Ocurrió un error al completar la ruta.',
                });
              }
        } catch (error) {
            console.error('Error al actualizar el viaje:', error);
        }
    }
    
    const onDrop = (evt, completed) => {
        const itemID = evt.dataTransfer.getData('itemID');
        const item = trips.find(item => item.id === itemID);
    
        if (!item.completed && completed) {
            AntdModal.confirm({
                title: '¿Estás seguro?',
                content: '¿Quieres marcar este viaje como completado?',
                onOk() {
                    item.completed = true; 
    
                    const newState = trips.map(trip => {
                        if (trip.id === itemID) return item;
                        return trip;
                    });
                    setTrips(newState);
    
                    updateTrip(item);
                },
                onCancel() {
                    console.log('Cancelado');
                },
            });
        }
    }    
    
    const formatTime = (timeInHours) => {
        const hours = Math.floor(timeInHours);
        const minutes = Math.round((timeInHours - hours) * 60);
        return `${hours} hrs ${minutes} min`;
    }

    const handleDateChange = (selectedDate) => {
          setDate(selectedDate);
    };

    const handleFilter = async() => {
        if (date < "") {
          AntdModal.error({
            content: 'Elige una fecha valida',
          });
          return
        }

        if(truckId === ""){
            AntdModal.error({
                content: 'Selecciona un camion',
              });
              return
        }
        
        const data = {
            userId, 
            truckId, 
            date 
        };
        console.log(data);

        const response = await tripController.getsListByDate(data);
        const dataTrips = await response.json();
        setTrips(dataTrips);
    }  

    return (
        <>
        <div className='div-kanba-filter'>
            <h1 className="h1-kanba">
                Mis Viajes
                <img className='icon-react' src="src/assets/react.svg" alt="" />
            </h1>
            <div className='div-filter'>
                <div className='div-div-filter'>
                <div>
                  <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={date}
                        onChange={handleDateChange}
                        sx={{ width: '370px', marginBottom: '40px' }}
                      />
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>
                <div>
                <ThemeProvider theme={theme}>
                  <FormControl sx={{ width: '370px', marginBottom: '40px' }} variant="outlined">
                      <Autocomplete
                          id="combo-box-demo"
                          options={licensePlates}
                          getOptionLabel={(option) => option.licensePlate}
                          style={{ width: 370 }}
                          renderInput={(params) => <TextField {...params} label="Placa" variant="outlined" />}
                          onInputChange={handleChangeLicensePlate}
                      />
                  </FormControl>
              </ThemeProvider>
                </div>
                <div className='button-filter'>
              <Button
                variant="contained"
                disableElevation
                onClick={handleFilter}
              >
                Filtrar
              </Button>
              </div>
            </div>
            </div>
            <div className='drag-and-drop'>
                <div className='column column--1'>
                    <h3>
                        Viajes por hacer
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={draggingOver} onDrop={(evt) => onDrop(evt, false)}>
                        {trips.length > 0 ? trips.filter(item => !item.completed).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>Viaje</strong>
                                <p className='body'>Origen: {parsedLocations[item.id]?.origin || 'Cargando...'}</p>
                                {parsedLocations[item.id]?.waypoints.map((waypoint, index) => <p key={index} className='body'>Parada {index + 1}: {waypoint}</p>)}                                
                                <p className='body'>Destino: {parsedLocations[item.id]?.destination || 'Cargando...'}</p>
                                <p className='body'>Distancia: {item.distance} km</p>
                                <p className='body'>Tiempo: {formatTime(item.time)}</p>
                            </div>
                        )) : <p>No tienes viajes pendientes</p>}
                    </div>
                </div>

                <div className='column column--2'>
                    <h3>
                        Viajes realizados
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={draggingOver} onDrop={(evt) => onDrop(evt, true)}>
                        {trips.length > 0 ? trips.filter(item => item.completed).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>Viaje</strong>
                                <p className='body'>Origen: {parsedLocations[item.id]?.origin || 'Cargando...'}</p>
                                {parsedLocations[item.id]?.waypoints.map((waypoint, index) => <p key={index} className='body'>Parada {index + 1}: {waypoint}</p>)}                                
                                <p className='body'>Destino: {parsedLocations[item.id]?.destination || 'Cargando...'}</p>
                                <p className='body'>Distancia: {item.distance} km</p>
                                <p className='body'>Tiempo: {formatTime(item.time)}</p>
                            </div>
                        )) : <p>No tienes viajes realizados</p>}
                    </div>
                </div>

            </div>
            </div>
        </>
    )
}

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