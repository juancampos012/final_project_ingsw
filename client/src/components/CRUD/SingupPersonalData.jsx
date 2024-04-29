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

  const navigate = useNavigate();

  const handleCreate = async () => {
    const user = {
      name,
      lastName,
      identification,
    }
    userController.createCookie("user", JSON.stringify(user));
    navigate('/singup-data-log');
    window.location.reload();
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
      <>
        <div className='div-login'>
          <div className='div-login-left'>
          </div>
          <div className='div-login-right'>
            <div className='div-login-info'>
              <div className='text-login'>
                <h2>Nuevo usuario</h2>
                <h4>Servientrega</h4>
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