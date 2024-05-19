import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { User } from '../../request/users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

const userController = new User();

export const Login = () => {
  const [passwordHash, setPasswordHash] = React.useState(""); 
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
      try {
          const data = {
            passwordHash,
            email,
          };
          const response = await userController.login(data);
          const responseData = await response.json();
          if(response.status === 200){
            const role = responseData.user.role;
            const token = responseData.token; 
            await userController.createCookie("jwt", token);
            if(role === 'user'){
              navigate("/home-user");
            }else{
              navigate('/home');
            }
          }else if(response.status === 401){
            alert("user not login");
          }else if(response.status === 500){
            alert("err");
          }
      } catch (error) {
          alert("Ocurrió un error al intentar crear el usuario");
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
                        <h2 className='tittle-login'>Bienvenido</h2>
                    </div>
                    <div>
                        <ThemeProvider theme={theme}>
                            <TextField sx={{ width: '370px', marginTop: '40px' , borderRadius: '100px'}} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())} />
                        </ThemeProvider>
                    </div>
                    <div>
                        <ThemeProvider theme={theme}>
                            <FormControl sx={{ width: '370px', marginTop: '50px', mb:'10px' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
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
                                    label="Password"
                                    value={passwordHash}
                                    onChange={(e) => setPasswordHash(e.target.value)}
                                /> 
                            </FormControl>
                        </ThemeProvider>
                    </div>
                    <div className="button-login">
                        <Button 
                            variant="contained" 
                            disableElevation
                            onClick={handleLogin}
                            style={{ backgroundColor: '#000000', width: '270px',height: '40px', borderRadius: '15px', marginTop:'40px', borderBottom:'0' }}
                        >
                            Iniciar Sesión
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
