import React from 'react';
import { Truck } from '../request/trucks';
import { Maintenance } from '../request/maintenance';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal as AntdModal } from 'antd';
import { Modal as MuiModal } from '@mui/material';import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const truckController = new Truck();
const maintenanceController = new Maintenance();
const options = ['General', 'Aceite', 'Refrigerante', 'Frenos']; 

export const MaintenanceComponent = () => {
  const [licensePlate, setLicensePlate] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [licensePlates, setLicensePlates] = React.useState("");
  const [truckId, setTruckId] = React.useState("");
  const [type, setType] = React.useState("");
  const [nextDate, setNextDate] = React.useState(dayjs());
  const [cost, setCost] = React.useState("");

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

  const handleCreate = async () => {
    const costInt = parseInt(cost);
    const data = {
      type,
      nextDate,
      cost: costInt, 
      truckId, 
    }
    const response = await maintenanceController.newMaintenance(data);
    if (response.status === 201) {
      setOpen(false);
      AntdModal.success({
          content: 'Mantenimiento creada correctamente.',
      });
    } else {
        AntdModal.error({
            content: 'Ocurrió un error al crear el mantenimiento.',
        });
    }
  }  

  const handleOpen = () =>{
    if(truckId){
      setOpen(true);
    }else{
        AntdModal.error({
            content: 'Selecciona un camion.',
        });
    }
  }

  const handleClose = () =>{
    setOpen(false);
    setType("");
    setCost("");
  }

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleDateChange = (date) => {
    setNextDate(date);
  };

  return (
    <div>
      <div className='div-top-maintenance'>
        <div>
            <h4>Mantenimientos</h4>
        </div>
        <div className='div-div-top-maintenance'>
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
                <div className="button-create-maintenance">
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleOpen}
                >
                    Mantenimiento
                </Button>
                </div>
            </div>
        </div>
        <div >
        <MuiModal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='text-login'>
              <h2>Nuevo mantenimiento</h2>
            </div>
            <div className='div-create-truck'>
              <div className='div-create-truck-rigth'>
                <div>
                    <ThemeProvider theme={theme}>
                        <FormControl sx={{ width: '370px', marginBottom: '40px' }}  variant="outlined">
                        <InputLabel id="demo-simple-select-label">Tipo de mantenimiento</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Tipo de mantenimiento"
                            onChange={handleChange}
                          >
                            {options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                    </ThemeProvider>
                </div>
                <div>
                  <ThemeProvider theme={theme}>
                    <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Costo($)" variant="outlined" value={cost} onChange={(e) => setCost(e.target.value)}/>
                  </ThemeProvider>
                </div>
                <div>
                  <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={nextDate}
                        onChange={handleDateChange}
                        sx={{ width: '370px', marginBottom: '40px' }}
                      />
                    </LocalizationProvider>
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
          </MuiModal>
        </div>
        </div>
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