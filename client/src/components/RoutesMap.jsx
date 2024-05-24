import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete as MaterialAutocomplete } from '@mui/material';
import { GoogleMap, LoadScript, DirectionsRenderer, Autocomplete as MapAutocomplete } from '@react-google-maps/api';
import { Trip } from '../request/trip';
import { User } from '../request/users';
import { Truck } from '../request/trucks';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal as AntdModal } from 'antd';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { addTrip } from '../slices/tripSlice'; 

const userController = new User();
const truckController = new Truck();
const tripController = new Trip();

export const MapComponent = () => {
  const dispatch = useDispatch();
  const [licensePlate, setLicensePlate] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlates, setLicensePlates] = useState([]);
  const [identifications, setIdentifications] = useState([]);
  const [identification, setIdentification] = useState("");
  const [userId, setUserId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [timeString, setTimeString] = useState("");
  const [distanceString, setDistanceString] = useState("");
  const [response, setResponse] = useState(null);
  const [originPlace, setOrigin] = useState("");
  const [destinationPlace, setDestination] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [newWaypoint, setNewWaypoint] = useState("");
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const autocompleteOriginRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);
  const autocompleteWaypointRefs = useRef([]);

  const navigate = useNavigate();

  const onLoadOrigin = (autocomplete) => {
    autocompleteOriginRef.current = autocomplete;
  };

  const onLoadDestination = (autocomplete) => {
    autocompleteDestinationRef.current = autocomplete;
  };

  const onLoadWaypoint = (autocomplete, index) => {
    autocompleteWaypointRefs.current[index] = autocomplete;
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

  const onPlaceChangedWaypoint = (index) => {
    if (autocompleteWaypointRefs.current[index] !== null) {
      const place = autocompleteWaypointRefs.current[index].getPlace();
      if (place && place.geometry && place.geometry.location) {
        const newWaypoints = [...waypoints];
        newWaypoints[index] = place.geometry.location.toJSON();
        setWaypoints(newWaypoints);
      }
    }
  };
  
  const addWaypoint = () => {
    const updatedWaypoints = [...waypoints, newWaypoint];
    setWaypoints(updatedWaypoints);
    setNewWaypoint("");
  };

  const removeWaypoint = (index) => {
    const newWaypoints = waypoints.filter((_, i) => i !== index);
    setWaypoints(newWaypoints);
  };

  useEffect(() => {
    if (isMapsLoaded && originPlace && destinationPlace && window.google && window.google.maps) {
      const directionsService = new window.google.maps.DirectionsService();
  
      directionsService.route(
        {
          origin: originPlace,
          destination: destinationPlace,
          waypoints: waypoints.map(wp => ({ location: wp, stopover: true })),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setResponse(result);
            const distances = result.routes[0].legs.map(leg => leg.distance.text);
            const times = result.routes[0].legs.map(leg => leg.duration.text);
            setDistanceString(distances);
            setTimeString(times);
            console.log(times);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [isMapsLoaded, originPlace, destinationPlace, waypoints]);

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
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

  const handleChangeIdentification = (event, newValue) => {
    setIdentification(newValue);
  };
  
  const handleChangeLicensePlate = (event, newValue) => {
    setLicensePlate(newValue);
  };

  const handleCreate = async () => {
    let totalDistance = 0;
    let totalTime = 0;
    let totalHours = 0;
    let totalMinutes = 0;
  
    for(let i = 0; i < distanceString.length; i++) {
      let distanceParts = distanceString[i].split(" ");
      totalDistance += parseFloat(distanceParts[0]);
    }
    
    for (let i = 0; i < timeString.length; i++) {
      let timeParts = timeString[i].split(" ");
      for (let j = 0; j < timeParts.length; j++) {
          if (timeParts[j] === "h") {
              totalHours += parseFloat(timeParts[j - 1]);
          }
          if (timeParts[j] === "min") {
              totalMinutes += parseFloat(timeParts[j - 1]);
          }
      }
    }
    
    totalTime = totalHours + totalMinutes / 60;
  
    const data = {
      originPlace: JSON.stringify(originPlace),
      destinationPlace: JSON.stringify(destinationPlace),
      waypoints: waypoints.map(wp => JSON.stringify(wp)),
      distance: totalDistance,
      time: totalTime,
      userId,
      truckId 
    };
  
    const response = await tripController.newTrip(data);
    dispatch(addTrip(data));
  
    if (response.status === 201) {
      navigate("/see-routes-admin");
      AntdModal.success({
        content: 'Ruta creada correctamente.',
      });
    } else {
      AntdModal.error({
        content: 'Ocurrió un error al crear la ruta.',
      });
    }
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
                  <FormControl sx={{ width: '370px', marginBottom: '40px' }} variant="outlined">
                      <MaterialAutocomplete
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
                            <MaterialAutocomplete
                                id="combo-box-demo"
                                options={identifications}
                                getOptionLabel={(option) => option.identification}
                                style={{ width: 370 }}
                                renderInput={(params) => <TextField {...params} label="Placa" variant="outlined" />}
                                onInputChange={handleChangeIdentification}
                            />
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
          <MapAutocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlaceChangedOrigin}>
            <div>
              <h3>Origen</h3>
              <ThemeProvider theme={theme}>
                <TextField sx={{ width: '370px' }} id="outlined-basic" label="Origen" variant="outlined"/>
              </ThemeProvider>
            </div>
          </MapAutocomplete>
          <MapAutocomplete onLoad={onLoadDestination} onPlaceChanged={onPlaceChangedDestination}>
            <div>
              <h3>Destino</h3>
              <ThemeProvider theme={theme}>
                <TextField sx={{ width: '370px' }} id="outlined-basic" label="Destino" variant="outlined"/>
              </ThemeProvider>
            </div>
          </MapAutocomplete>
          <div className='div-add-waypoint'>
            <h3>Paradas</h3>
            <ThemeProvider theme={theme}>
              {waypoints.map((waypoint, index) => (
                <div key={index} className='div-delete-waypoint'>
                  <MapAutocomplete
                    onLoad={(autocomplete) => onLoadWaypoint(autocomplete, index)}
                    onPlaceChanged={() => onPlaceChangedWaypoint(index)} 
                  >
                    <TextField sx={{ width: '370px', marginBottom: '10px' }} label={`Parada ${index + 1}`} variant="outlined" />
                  </MapAutocomplete>
                  <Button onClick={() => removeWaypoint(index)} variant="contained" disableElevation style={{ marginBottom: '10px' }}>
                    Eliminar Parada
                  </Button>
                </div>
              ))}
              <MapAutocomplete>
                <TextField
                  sx={{ width: '370px' }}
                  id="outlined-basic"
                  label="Nueva Parada"
                  variant="outlined"
                  value={newWaypoint}
                  onChange={(e) => setNewWaypoint(e.target.value)}
                />
              </MapAutocomplete>
              <Button onClick={addWaypoint} variant="contained" disableElevation style={{ marginTop: '10px', marginBottom: '40px' }}>
                Añadir Parada
              </Button>
            </ThemeProvider>
          </div>
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