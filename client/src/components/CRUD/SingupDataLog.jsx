import * as React from 'react';
import { User } from '../../request/users';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { json, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const SingupDataLog = () => {
  const miCookieUser = Cookies.get('user');
  const user = JSON.parse(miCookieUser);
  const miCookieAddress = Cookies.get('address');
  const address = JSON.parse(miCookieAddress);
  const name = user.name;
  const lastName = user.lastName;
  const identification = user.identification;
  const department = address.departament;
  const municipality = address.municipality;
  const nomenclature = address.nomenclature;
  const [passwordHash, setPasswordHash] = React.useState(""); 
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState(null); 
  const [showPassword, setShowPassword] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    if (file && validImageTypes.includes(file.type)) {
        setImage(file);
        setUploadSuccess(true);
        setTimeout(() => {
          setUploadSuccess(false);
        }, 1600);
    } else {
        alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleCreate = async () => {
      try {
          const data = {
            name,
            lastName,
            identification,
            passwordHash,
            email,
            department,
            municipality,
            nomenclature,
          };
          const response = await userController.newUser(data, image);
          response.status === 201
            ? alert("Creación exitosa")
            : alert("Error al crear el producto");
      } catch (error) {
          console.error(error);
          alert("Ocurrió un error al intentar crear el producto");
      }
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
                <h4>Datos perfil</h4>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}/>
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
              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  style={{ backgroundColor: '#000000', borderRadius: '50px', marginTop:'35px' }}
                >
                  Cargar foto
                  <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageUpload}/>
                </Button>
              </div>
              <div className="button-singup">
                <Button 
                  variant="contained" 
                  disableElevation
                  onClick={handleCreate}
                  style={{ backgroundColor: '#000000', width: '250px', borderRadius: '50px', marginTop:'35px' }}
                >
                  Crear usuario
                </Button>
                {uploadSuccess && <p>La foto se ha cargado exitosamente.</p>}
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