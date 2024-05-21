import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Truck } from '../request/trucks';
import { Refueling } from '../request/refuelings';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { addRefueling } from '../slices/refuelingSlice';

const truckController = new Truck();
const refuelingController = new Refueling();

export const RefuelingComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [brandTruck, setBrandTruck] = useState("");
  const [model, setModel] = React.useState("");
  const [licensePlates, setLicensePlates] = React.useState("");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [truckId, setTruckId] = React.useState("");
  const dispatch = useDispatch();


  const handleOpen = () =>{
    if(truckId){
      setOpen(true);
    }else{
      alert("Selecciona un camion.")
    }
  }
  const handleClose = () =>{
    setOpen(false);
    setCost("");
    setEfficiency("");
    setQuantity("");
  }

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
          setBrandTruck(response.brand);
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

  const handleCreate = async () => {
    try {
        if (isNaN(cost) || isNaN(quantity) || isNaN(efficiency)) {
          alert("Por favor, introduce solo números");
        } else {
          const cosInt = parseInt(cost);
          const quantityInt = parseInt(quantity);
          const efficiencyInt = parseInt(efficiency);
          const data = {
            cost: cosInt,
            quantity: quantityInt,
            efficiency: efficiencyInt, 
            truckId
          };

          dispatch(addRefueling(data));

          const response = await refuelingController.newRefueling(data);
          response.status === 201
          ? alert("Creacion exitosa")
          : alert("Error al crear el reabastesimiento");
        }
      } catch (error) {
        console.error(error);
        alert("Ocurrió un error al intentar crear el camion");
      }
      
  };  

  return (
    <>
    
      <div className='div-top-tires'>
        <h3>Combustible</h3>
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
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Marca" variant="outlined" value={brandTruck} />
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Modelo" variant="outlined" value={model} />
                </ThemeProvider>
              </div>
              <div className="button-create-truck">
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpen}
              >
                Abastecer
              </Button>
            </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' , marginBottom: '200px' }}>
        <div >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='text-login'>
              <h2>Cargar combustible</h2>
            </div>
            <div className='div-create-truck'>
            <div className='div-create-truck-rigth'>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Cantidad" variant="outlined" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Eficiencia" variant="outlined" value={efficiency} onChange={(e) => setEfficiency(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Costo" variant="outlined" value={cost} onChange={(e) => setCost(e.target.value)}/>
                </ThemeProvider>
              </div>
            </div>
            </div>
            <div className="button-create-truck">
              <Button
                variant="contained"
                disableElevation
                onClick={handleCreate}
              >
                Crear
              </Button>
            </div>
          </Box>
          </Modal>
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

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};