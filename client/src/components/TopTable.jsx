import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export const TopTable = () => {
  const [open, setOpen] = React.useState(false);
  const [licensePlate, setLicensePlate] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [identification, setIdentification] = React.useState("");
  const [identifications, setIdentifications] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = async () => {
    const data = {
      licensePlate,
      brand,
      model,
      year,
      capacity,
      identification,
    };
    console.log(data);
  };

  const handleChangeDepartament = (event) => {
    setIdentification(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: 'black' }}>Crear Camión</Button>
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
                    <FormControl sx={{ width: '370px'}}  variant="outlined">
                        <InputLabel id="demo-simple-select-label">Identificacion</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={identification}
                            label="Departamento"
                            onChange={handleChangeDepartament}
                        >
                            {identifications && identifications.map((identification) => (
                            <MenuItem key={identification} value={identification}>{identification}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Nombre" variant="outlined" value={name} />
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Apellido" variant="outlined" value={lastName} />
                </ThemeProvider>
              </div>
            </div>
            <div className='div-create-truck-rigth'>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px' }} id="outlined-basic" label="Placa" variant="outlined" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Marca" variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Linea" variant="outlined" value={model} onChange={(e) => setModel(e.target.value)} />
                </ThemeProvider>              
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Año" variant="outlined" value={year} onChange={(e) => setYear(e.target.value)} />
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '40px' }} id="outlined-basic" label="Capacidad" variant="outlined" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                </ThemeProvider>
              </div>
            </div>
          </div>
          <div className="button-create-truck">
            <Button
              variant="contained"
              disableElevation
              onClick={handleCreate}
              style={{ backgroundColor: '#000000', width: '250px', borderRadius: '50px', marginTop: '35px' }}
            >
              Crear
            </Button>
          </div>
        </Box>
      </Modal>
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

export default TopTable;
