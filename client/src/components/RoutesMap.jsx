import React, { useEffect, useState, useRef } from 'react';
import { Trip } from '../request/trip';
import { User } from '../request/users';
import { Truck } from '../request/trucks';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleMap, LoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const userController = new User();
const truckController = new Truck();
const tripController = new Trip();

export const MapComponent = () => {
  const [licensePlate, setLicensePlate] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [licensePlates, setLicensePlates] = React.useState("");
  const [identifications, setIdentifications] = React.useState("");
  const [identification, setIdentification] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [truckId, setTruckId] = React.useState("");
  const [timeString, setTimeString] = React.useState("");
  const [distanceString, setDistanceString] = React.useState("");
  const [time, setTime] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [response, setResponse] = useState(null);
  const [originPlace, setOrigin] = useState("");
  const [destinationPlace, setDestination] = useState("");
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const autocompleteOriginRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);

  const onLoadOrigin = (autocomplete) => {
    autocompleteOriginRef.current = autocomplete;
  };

  const onLoadDestination = (autocomplete) => {
    autocompleteDestinationRef.current = autocomplete;
  };

  const onPlaceChangedOrigin = () => {
    if (autocompleteOriginRef.current !== null) {
      const place = autocompleteOriginRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        setOrigin(place.geometry.location.toJSON());
      }
    }
  };
  
  const onPlaceChangedDestination = () => {
    if (autocompleteDestinationRef.current !== null) {
      const place = autocompleteDestinationRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        setDestination(place.geometry.location.toJSON());
      }
    }
  };  

  useEffect(() => {
    if (isMapsLoaded && originPlace && destinationPlace && window.google && window.google.maps) {
      const directionsService = new window.google.maps.DirectionsService();
  
      directionsService.route(
        {
          origin: originPlace,
          destination: destinationPlace,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setResponse(result);
            setDistanceString(result.routes[0].legs[0].distance.text);
            setTimeString(result.routes[0].legs[0].duration.text);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [isMapsLoaded, originPlace, destinationPlace]);

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
      try {
        const response = await userController.getListIdentifications();
        setIdentifications(response);
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

  React.useEffect(() => {
    const fetchData = async () => {
      if (identification) {
        try {
          const response = await userController.getUserByIdentification(identification);
          setName(response.name);
          setLastName(response.lastName);
          setUserId(response.id);
        } catch (error) {
          console.error('Hubo un error al obtener los datos del usuario:', error);
        }
      }
    };
    fetchData();
  }, [identification]);  

  const handleChangeIdentification = (event) => {
    setIdentification(event.target.value);
  };
  
  const handleChangeLicensePlate = (event) => {
    setLicensePlate(event.target.value);
  };

  const handleCreate = async () => {
    setDistance(parseFloat(distanceString.split(" ")[0]));
    const parts = timeString.split(" ");
    const hours = parseFloat(parts[0]);
    const minutes = parseFloat(parts[2]);
    setTime(hours + minutes / 60);
  
    const data = {
      originPlace: JSON.stringify(originPlace),
      destinationPlace: JSON.stringify(destinationPlace),
      distance, 
      time, 
      userId, 
      truckId 
    };
    console.log(data);
    const response = await tripController.newTrip(data);
    console.log(response);
  }  

  return (
    <div>
      <div className='div-top-routes'>
        <div>
            <h4>Rutas</h4>
        </div>
        <div className='div-div-top-routes'>
            <div>
                <h3>Camion</h3>
                <div>
                    <ThemeProvider theme={theme}>
                        <FormControl sx={{ width: '370px', marginBottom: '40px' }}  variant="outlined">
                            <InputLabel id="demo-simple-select-label">Placa</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={licensePlate}
                                    label="Placa"
                                    onChange={handleChangeLicensePlate}
                                >
                                {licensePlates && licensePlates.map((licensePlate) => (
                                    <MenuItem key={licensePlate.licensePlate} value={licensePlate.licensePlate}>{licensePlate.licensePlate}</MenuItem>
                                ))}
                                </Select>
                        </FormControl>
                    </ThemeProvider>
                </div>
                <div>
                    <ThemeProvider theme={theme}>
                        <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Marca" variant="outlined" value={brand} />
                    </ThemeProvider>
                </div>
                <div>
                    <ThemeProvider theme={theme}>
                        <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Modelo" variant="outlined" value={model} />
                    </ThemeProvider>
                </div>
            </div>
            <div>
                <h3>Conductor</h3>
                <div>
                    <ThemeProvider theme={theme}>
                        <FormControl sx={{ width: '370px', marginBottom: '40px'}}  variant="outlined">
                            <InputLabel id="demo-simple-select-label">Identificacion</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={identification}
                                label="Identificacion"
                                onChange={handleChangeIdentification}
                            >
                                {identifications && identifications.map((identification) => (
                                    <MenuItem key={identification.identification} value={identification.identification}>{identification.identification}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ThemeProvider>
                </div>
                <div>
                    <ThemeProvider theme={theme}>
                        <TextField sx={{ width: '370px', marginBottom: '40px'}} id="outlined-basic" label="Nombre" variant="outlined" value={name} />
                    </ThemeProvider>
                </div>
                <div>
                    <ThemeProvider theme={theme}>
                        <TextField sx={{ width: '370px', marginBottom: '40px'}} id="outlined-basic" label="Apellido" variant="outlined" value={lastName} />
                    </ThemeProvider>
                </div>
            </div>
        </div>
    </div>
      <LoadScript googleMapsApiKey="AIzaSyAf2AHLtGvjMJouKecs0kkw1AQw2YTZfdc" libraries={["places"]} onLoad={() => setIsMapsLoaded(true)}>
        <div className='div-autocomplete-map'>
          <Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlaceChangedOrigin}>
            <div>
              <h3>Origen</h3>
              <ThemeProvider theme={theme}>
                <TextField sx={{ width: '370px' }} id="outlined-basic" label="Origen" variant="outlined"/>
              </ThemeProvider>
            </div>
          </Autocomplete>
          <Autocomplete onLoad={onLoadDestination} onPlaceChanged={onPlaceChangedDestination}>
            <div>
              <h3>Destino</h3>
              <ThemeProvider theme={theme}>
                <TextField sx={{ width: '370px' }} id="outlined-basic" label="Destino" variant="outlined"/>
              </ThemeProvider>
            </div>
          </Autocomplete>
        </div>
        <div className='div-map-route'>  
          <GoogleMap
            id='direction-example'
            mapContainerStyle={{
              height: "70vh",
              width: "70%"
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
        <div className="button-create-truck">
          <Button
            variant="contained"
            disableElevation  
            onClick={handleCreate}
            style={{ marginBottom: '100px' }}
          >
            Crear
          </Button>
        </div>
      </LoadScript>
    </div>
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