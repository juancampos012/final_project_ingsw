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
  const [userId, setUserId] = React.useState("");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [licensePlates, setLicensePlates] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await truckController.getListLicensePlates();
        setLicensePlates(response);
        setUserId(response.userId);
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
          setUserId(response.userId)
        } catch (error) {
          console.error('Hubo un error al obtener los datos del usuario:', error);
        }
      }
    };
    fetchData();
  }, [licensePlate]);  

  React.useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await userController.getUserById(userId);
          setName(response.name);
          setLastName(response.lastName);
        } catch (error) {
          console.error('Hubo un error al obtener los datos del usuario:', error);
        }
      }
    };
    fetchData();
  }, [userId]);  

  const handleChangeIdentification = (event) => {
    setLicensePlate(event.target.value);
  };

  return (
    <>
    <div>
        <ThemeProvider theme={theme}>
            <FormControl sx={{ width: '370px'}}  variant="outlined">
                <InputLabel id="demo-simple-select-label">Placa</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={licensePlate}
                        label="Placa"
                        onChange={handleChangeIdentification}
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
            <TextField sx={{ width: '370px' }} id="outlined-basic" label="Nombre" variant="outlined" value={name} />
        </ThemeProvider>
    </div>
    <div>
        <ThemeProvider theme={theme}>
            <TextField sx={{ width: '370px' }} id="outlined-basic" label="Apellido" variant="outlined" value={lastName} />
        </ThemeProvider>
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