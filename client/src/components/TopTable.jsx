import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { User } from '../request/users';
import { Truck } from '../request/trucks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

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

const truckController = new Truck();

export const TopTable = () => {
  const [open, setOpen] = React.useState(false);
  const [licensePlate, setLicensePlate] = React.useState("");
  const [mileage, setMileage ] = React.useState("");
  const [userId, setUserId ] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");
  const [capacity, setCapacity] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = async () => {
    const mileageInt = parseInt(mileage);
    const capacityInt = parseInt(capacity);
    try {
      const data = {
        licensePlate,
        brand,
        model,
        year,
        capacity: capacityInt,
        mileage: mileageInt,
        userId, 
      };
      console.log(data);
      const response = await truckController.newTrucK(data);
      response.status === 201
        ? alert("Creacion exitosa")
        : alert("Error al crear el camion");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar crear el camion");
    }
  };  


  return (
    <div className='div-top-table'>
      <div>
        <h4>Camiones</h4>
      </div>
      <div >
        <Button onClick={handleOpen} sx={{ color: 'black', mr: '10px', marginBottom: '0'}}>Crear Camión</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='text-login'>
              <h2>Nuevo Camion</h2>
            </div>
            <div className='div-create-truck'>
              <div className='div-create-truck-left'>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px' }}id="outlined-basic" label="Placa" variant="outlined" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
                  </ThemeProvider>
                  <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Marca" variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} />
                  </ThemeProvider>
                  </div>
                  <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Capacidad" variant="outlined" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                  </ThemeProvider>
                </div>
                </div>
              </div>
              <div className='div-create-truck-rigth'>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px' }} id="outlined-basic" label="Linea" variant="outlined" value={model} onChange={(e) => setModel(e.target.value)} />
                  </ThemeProvider>              
                </div>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Año" variant="outlined" value={year} onChange={(e) => setYear(e.target.value)} />
                  </ThemeProvider>
                </div>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Kilometraje" variant="outlined" value={mileage} onChange={(e) => setMileage(e.target.value)} />
                  </ThemeProvider>
                </div>
              </div>
            </div>
            <div className="button-create-route">
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
  );
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