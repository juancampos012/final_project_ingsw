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
  const [nameIsEmpty, setNameIsEmpty] = React.useState(false);  
  const [lastnameIsEmpty, setLastnameIsEmpty] = React.useState(false);  
  const [idIsEmpty, setIdIsEmpty] = React.useState(false);  

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
      window.location.reload();
    } else {
      setIsEmpty(true);
      alert('Por favor, rellene todos los campos antes de continuar.');
    }
  };

  const handleEmpty = () => {
    return name !== "" && lastName !== "" && identification !== "";
  }

  const handleLoginClick = () => {
    navigate('/login');
  };
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isEmpty ?  'red' : 'black',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isEmpty ?  'red' : 'black',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: isEmpty ?  'red' : 'black',
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
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '50px' }}  id="outlined-basic" label="Nombre" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Apellido" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Cedula" variant="outlined" value={identification} onChange={(e) => setIdentification(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div className="button-singup">
                <Button 
                  variant="contained" 
                  disableElevation
                  onClick={handleCreate}
                  style={{ backgroundColor: '#000000', width: '250px', borderRadius: '50px', marginTop:'35px' }}
                >
                  Siguiente
                </Button>
              </div>
              <a onClick={handleLoginClick}>Iniciar sesión</a>
            </div>
          </div>
        </div>
      </>
  );
}

