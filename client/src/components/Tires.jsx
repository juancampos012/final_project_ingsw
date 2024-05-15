import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Truck } from '../request/trucks';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const truckController = new Truck();

export const Tires = () => {
  const [hoveredWheel, setHoveredWheel] = useState(null);
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [licensePlates, setLicensePlates] = React.useState("");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [truckId, setTruckId] = React.useState("");

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

  const handleChangeLicensePlate = (event) => {
    setLicensePlate(event.target.value);
  };

  const Wheel = ({ onClick, isHovered, wheelNumber }) => (
    <div
      style={{
        width: '40px',
        height: '70px',
        borderRadius: '7px',
        backgroundColor: isHovered ? 'red' : 'black',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setHoveredWheel(wheelNumber)}
      onMouseLeave={() => setHoveredWheel(null)}
      onClick={() => {
        onClick();
      }}
    />

  );

  const Circle = () => (
    <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'grey' }} />
  );

  const Stick = () => (
    <div style={{ width: '180px', height: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );

  const VerticalStick = () => (
    <div style={{ height: '100px', width: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );

  const VerticalStickLarge = () => (
    <div style={{ height: '200px', width: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );


  return (
    <>
      <div className='div-top-tires'>
        <h3>Llantas</h3>
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' , marginBottom: '200px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '-55px' }}>
          <Circle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px' }}>
          <Wheel onClick={() => console.log('Clicked wheel 1')} isHovered={hoveredWheel === 1} wheelNumber={1} />
          <Stick />
          <Wheel onClick={() => console.log('Clicked wheel 2')} isHovered={hoveredWheel === 2} wheelNumber={2} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '-40px' }}>
          <VerticalStickLarge />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-3px', marginBottom: '-23px' }}>
          <Circle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px', marginTop: '-30px' }}>
          <Wheel onClick={() => console.log('Clicked wheel 3')} isHovered={hoveredWheel === 3} wheelNumber={3} />
          <Stick />
          <Wheel onClick={() => console.log('Clicked wheel 4')} isHovered={hoveredWheel === 4} wheelNumber={4} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '-40px' }}>
          <VerticalStick />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-3px', marginBottom: '-23px' }}>
          <Circle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px', marginTop: '-30px' }}>
          <Wheel onClick={() => console.log('Clicked wheel 5')} isHovered={hoveredWheel === 5} wheelNumber={5} />
          <Stick />
          <Wheel onClick={() => console.log('Clicked wheel 6')} isHovered={hoveredWheel === 6} wheelNumber={6} />
        </div>
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