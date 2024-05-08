import * as React from 'react';
import { User } from '../../request/users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';

const userController = new User();

export const UpdatePersonalData = () => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [identification, setIdentification] = React.useState("");
  const [email, setEmail] = React.useState("");
  const miCookie = Cookies.get('jwt');

  React.useEffect(() => {
      userController.verifyToken(miCookie)
      .then(data => {
          return data.json();
      })
      .then(response => {
          if(response.user){
            setEmail(response.user.user.email);
              setName(response.user.user.name);
              setLastName(response.user.user.lastName);
              setIdentification(response.user.user.identification);
          }
      })
      .catch(error => {
          console.error(error); 
      });
  }, [miCookie]);

  const handleUpdate = async () => {
    try {
        const data = {
          name,
          lastName,
          identification,
          email,
        };
        const response = await userController.updateUser(data);
        if(response.status === 201){
          alert("Edicion exitosa");
          userController.createCookie("jwt", "cerrarseision");
          window.location.reload();
        }else{
          alert("Error al editar el usuario");
        }
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al intentar editar el usuario");
    }
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
                <h4>Datos personales</h4>
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
                  Editar perfil
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