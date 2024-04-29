import * as React from 'react';
import { User } from '../../request/users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';

const userController = new User();

export const UpdatePersonalData = () => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [identification, setIdentification] = React.useState("");
  const miCookie = Cookies.get('jwt');
  const navigate = useNavigate();

  React.useEffect(() => {
      userController.verifyToken(miCookie)
      .then(data => {
          return data.json();
      })
      .then(response => {
          if(response.user){
              setName(response.user.user.name);
              setLastName(response.user.user.lastName);
              setIdentification(response.user.user.identification);
          }
      })
      .catch(error => {
          console.error(error); 
      });
  }, []);

  const handleUpdate = async () => {
    const user = {
        name,
        lastName,
        identification,
    }
    userController.createCookie("user", JSON.stringify(user));
    navigate('/update-data-log');
    window.location.reload();
  };

  return (
      <>
        <div className='div-login'>
          <div className='div-login-left'>
          </div>
          <div className='div-login-right'>
            <div className='div-login-info'>
              <div className='text-login'>
                <h2>Editar usuario</h2>
                <h4>Servientrega</h4>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '50px' }}  id="outlined-basic" label="Nombre" variant="outlined"  value={name} onChange={(e) => setName(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Apellido" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Cedula" variant="outlined" value={identification}/>
                </ThemeProvider>
              </div>
              <div className="button-singup">
                <Button 
                  variant="contained" 
                  disableElevation
                  onClick={handleUpdate}
                  style={{ backgroundColor: '#000000', width: '250px', borderRadius: '50px', marginTop:'35px' }}
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