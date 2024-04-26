import * as React from 'react';
import { User } from '../../request/users';
import { styled } from '@mui/material/styles';
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

export const CreateUser = () => {
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [passwordHash, setPasswordHash] = React.useState();
    const [email, setEmail] = React.useState("");
    const [image, setImage] = React.useState();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  
      if (file && validImageTypes.includes(file.type)) {
          setImage(file);
      } else {
          alert("Por favor, selecciona un archivo de imagen válido.");
      }
    };
  
    const handleCreate = async () => {
        try {
            const data = {
              name,
              lastName,
              passwordHash,
              email,
            };
            const response = await userController.newUser(data, image);
            response.status == 201
              ? alert("Creación exitosa")
              : alert("Error al crear el producto");
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al intentar crear el producto");
        }
    };
  
    return (
        <>
          <div>
            <TextField id="outlined-basic" label="Nombre" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div>
            <TextField id="outlined-basic" label="Apellido" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>
          <div>
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
          <div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageUpload}/>
            </Button>
          </div>
          <div className="button">
            <Button 
              variant="contained" 
              disableElevation
              onClick={handleCreate}
            >
              Registrar
            </Button>
          </div>
        </>
    );
}