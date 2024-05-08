import React, { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleMap, LoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';


export const MapComponent = () => {
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
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
    const handleLoad = () => {
      const directionsService = new window.google.maps.DirectionsService();
  
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setResponse(result);
            console.log(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    };
  
    if (window.google) {
      handleLoad();
    }
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAf2AHLtGvjMJouKecs0kkw1AQw2YTZfdc" libraries={["places"]}>
      <Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlaceChangedOrigin}>
        <div>
          <ThemeProvider theme={theme}>
            <TextField sx={{ width: '370px' }} id="outlined-basic" label="Origen" variant="outlined"/>
          </ThemeProvider>
        </div>
      </Autocomplete>
      <Autocomplete onLoad={onLoadDestination} onPlaceChanged={onPlaceChangedDestination}>
        <div>
          <ThemeProvider theme={theme}>
            <TextField sx={{ width: '370px' }} id="outlined-basic" label="Destino" variant="outlined"/>
          </ThemeProvider>
        </div>
      </Autocomplete>
      <GoogleMap
        id='direction-example'
        mapContainerStyle={{
          height: "400px",
          width: "800px"
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
    </LoadScript>
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