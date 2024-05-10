import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { User } from '../request/users';
import { Truck } from '../request/trucks';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const userController = new User();
const truckController = new Truck();

export const TopRoutes = () => {
  const [licensePlate, setLicensePlate] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [licensePlates, setLicensePlates] = React.useState("");
  const [identifications, setIdentifications] = React.useState("");
  const [identification, setIdentification] = React.useState("");

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

  return (
    <>
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