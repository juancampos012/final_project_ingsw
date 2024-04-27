import * as React from 'react';
import { User } from '../../request/users';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';

const userController = new User();

export const Login = () => {
  const [passwordHash, setPasswordHash] = React.useState(""); 
  const [email, setEmail] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCreate = async () => {
      try {
          const data = {
            passwordHash,
            email,
          };
          const response = await userController.login(data);
          if(response.status == 200){
            alert("login successful");
          }else if(response.status == 401){
            alert("user not login");
          }else if(response.status == 500){
            alert("err");
          }
      } catch (error) {
          alert("Ocurrió un error al intentar crear el producto");
      }
  };

  return (
    <>
        <div className='div-login'>
            <div className='div-login-left'>
            </div>
            <div className='div-login-rigth'>
                <div className='div-login-info-'>
                    <div>
                        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}/>
                    </div>
                    <div>
                        <FormControl sx={{   }} variant="outlined">
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
                    </div>
                    <div className="button">
                        <Button 
                            variant="contained" 
                            disableElevation
                            onClick={handleCreate}
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
