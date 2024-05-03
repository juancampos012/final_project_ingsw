import * as React from 'react';
import { User } from '../../request/users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Cookies from 'js-cookie';

const userController = new User();

export const UpdateDataLog = () => {
  const [passwordHash, setPasswordHash] = React.useState(""); 
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const miCookiejwt = Cookies.get('jwt');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    React.useEffect(() => {
        userController.verifyToken(miCookiejwt)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if(response.user){
                setEmail(response.user.user.email);
            }
        })
        .catch(error => {
            console.error(error); 
        });
    }, []);

  const handleUpdate = async () => {
      try {
          const data = {
            passwordHash,
            email,
          };
          const response = await userController.updateUser(data);
          response.status === 201
            ? alert("Edicion exitosa")
            : alert("Error al editar el usuario");
            userController.createCookie("jwt", "cerrarseision");
            window.location.reload();
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
                <h4>Datos perfil</h4>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Email" variant="outlined" value={email} />
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <FormControl sx={{ width: '370px', marginTop: '35px' }}  variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        value={passwordHash}
                        onChange={(e) => setPasswordHash(e.target.value)}
                        label="Password"
                      /> 
                  </FormControl>
                </ThemeProvider>
              </div>
              <div className="button-singup">
                <Button 
                  variant="contained" 
                  disableElevation
                  onClick={handleUpdate}
                  style={{ backgroundColor: '#000000', width: '250px', borderRadius: '50px', marginTop:'35px' }}
                >
                  Cambiar contraseña
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