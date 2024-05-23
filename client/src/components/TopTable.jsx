import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal as AntdModal } from 'antd';
import { Truck } from '../request/trucks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { addTruck, getTrucks } from '../slices/truckSlice';

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
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    licensePlate: "",
    brand: "",
    model: "",  
    year: "",
    mileage: 0,
    capacity: 0,
    actualStatus: "En operacion"
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleCreateTruck = async (e) => {
    e.preventDefault();
    try {
        const truckData = {
            licensePlate: formData.licensePlate,
            brand: formData.brand,
            model: formData.model,
            year: formData.year,
            mileage: Number(formData.mileage),  
            capacity: Number(formData.capacity),
            actualStatus: "En operacion",
        };
        const currentYear = new Date().getFullYear();

        if (truckData.licensePlate === "" || truckData.brand === "" || truckData.model === "" || 
            truckData.year === "" || truckData.mileage === "" || truckData.capacity === "") {
            AntdModal.error({
                content: 'Todos los campos son obligatorios.',
            });
            return;
        }

        if (truckData.year < 2010 || truckData.year > currentYear) {
            AntdModal.error({
                content: `El año debe estar entre 2010 y ${currentYear}.`,
            });
            return;
        }

        if (truckData.mileage <= 0) {
            AntdModal.error({
                content: 'El kilometraje debe ser mayor a cero.',
            });
            return;
        }

        if (truckData.capacity <= 0) {
            AntdModal.error({
                content: 'La capacidad debe ser mayor a cero.',
            });
            return;
        }
        const response = await truckController.newTrucK(truckData); 
          if (response.status === 201) {
            dispatch(addTruck(truckData));
            const data = await truckController.getListTrucks();
            dispatch(getTrucks(data));
            AntdModal.success({
                content: 'Camión creado correctamente.',
            });
        } else {
            AntdModal.error({
                content: 'Ocurrió un error al crear el camión.',
            });
        }

        setFormData({
            licensePlate: "",
            brand: "",
            model: "",
            year: "",
            mileage: 0,
            capacity: 0,
            actualStatus: "En operacion",
        });
        setOpen(false);
    } catch (error) {
        console.error("Error al crear camión:", error);
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
                    <TextField sx={{ width: '370px' }}id="licensePlate" label="Placa" variant="outlined" value={formData.licensePlate} onChange={handleChange} />
                  </ThemeProvider>
                  <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginTop: '40px' }} id="brand" label="Marca" variant="outlined" value={formData.brand} onChange={handleChange}/>
                  </ThemeProvider>
                </div>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginTop: '40px' }} id="year" label="Año" variant="outlined" value={formData.year} onChange={handleChange}/>
                  </ThemeProvider>
                </div>
                </div>
              </div>
              <div className='div-create-truck-rigth'>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px' }} id="model" label="Linea" variant="outlined" value={formData.model} onChange={handleChange} />
                  </ThemeProvider>              
                </div>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginTop: '40px' }} id="capacity" label="Capacidad" variant="outlined" value={formData.capacity} onChange={handleChange} />
                  </ThemeProvider>
                </div>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginTop: '40px' }} id="mileage" label="Kilometraje" variant="outlined" value={formData.mileage} onChange={handleChange} />
                  </ThemeProvider>
                </div>
              </div>
            </div>
            <div className="button-create-truck">
              <Button
                variant="contained"
                disableElevation
                onClick={handleCreateTruck}
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