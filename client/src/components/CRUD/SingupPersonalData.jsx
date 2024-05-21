import * as React from 'react';
import { User } from '../../request/users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const userController = new User();

export const SingupPersonalData = () => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [identification, setIdentification] = React.useState("");
  const [nameTheme, setNameTheme] = React.useState(theme);
  const [lastNameTheme, setLastNameTheme] = React.useState(theme);
  const [identificationTheme, setIdentificationTheme] = React.useState(theme);

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (handleEmpty()) {
      const user = {
        name,
        lastName,
        identification,
      }
      userController.createCookie("user", JSON.stringify(user));
      navigate('/signup-address');
    } else {
      alert('Por favor, rellene todos los campos antes de continuar.');
    }
  };

  const handleEmpty = () => {
    if(name === "" || lastName === "" || identification === ""){
      if(name === ""){
        setNameTheme(themeRed);
      }if(lastName === ""){
        setLastNameTheme(themeRed);
      }if(identification === ""){
        setIdentificationTheme(themeRed);
      }
      return false;
    }else{
      return true;
    }
  }

  const handleNameTheme = (value) => {
    value !== "" ? setNameTheme(theme) : setNameTheme(themeRed);
  }

  const handleLastNameTheme = (value) => {
    value !== "" ? setLastNameTheme(theme) : setLastNameTheme(themeRed);
  }

  const handleIdentificationTheme = (value) => {
    value !== "" ? setIdentificationTheme(theme) : setIdentificationTheme(themeRed);
  }
  
  return (
      <>
        <div className='div-login'>
          <div className='div-login-left'>
          </div>
          <div className='div-login-right'>
            <div className='div-login-info'>
              <div className='text-login'>
                <h2>Nuevo usuario</h2>
                <h4>Datos personales</h4>
              </div>
              <div>
                <ThemeProvider theme={nameTheme}>
                  <TextField sx={{ width: '370px', marginTop: '50px' }}  id="outlined-basic" label="Nombre" variant="outlined" value={name} onChange={(e) => {setName(e.target.value); handleNameTheme(e.target.value)}}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={lastNameTheme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Apellido" variant="outlined" value={lastName} onChange={(e) => {setLastName(e.target.value); handleLastNameTheme(e.target.value)}}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={identificationTheme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Cedula" variant="outlined" value={identification} onChange={(e) => {setIdentification(e.target.value); handleIdentificationTheme(e.target.value)}}/>
                </ThemeProvider>
              </div>
              <div className="button-singup">
                <Button 
                  variant="contained" 
                  disableElevation
                  onClick={handleCreate}
                  style={{ backgroundColor: '#000000', width: '270px',height: '40px', borderRadius: '15px', marginTop:'40px', borderBottom:'0' }}
                  >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
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

const themeRed = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
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
            color: 'red',
          },
        },
      },
    },
  },
});