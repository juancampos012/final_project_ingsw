import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { User } from '../request/users';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const userController = new User();

export const TopTableDrivers = () => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [identification, setIdentification] = React.useState("");
  const [nameTheme, setNameTheme] = React.useState(theme);
  const [lastNameTheme, setLastNameTheme] = React.useState(theme);
  const [identificationTheme, setIdentificationTheme] = React.useState(theme);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState("");
  const [departament, setDepartament] = React.useState("");
  const [municipality, setMunicipality] = React.useState("");
  const [nomenclature, setNomenclature] = React.useState("");
  const [departaments, setDepartaments] = React.useState("");
  const [municipalitys, setMunicipalitys] = React.useState("");
  const [departamentTheme, setDepartamentTheme] = React.useState(theme);
  const [municipalityTheme, setMunicipalityTheme] = React.useState(theme);
  const [nomenclatureTheme, setNomenclatureTheme] = React.useState(theme);
  const [passwordHash, setPasswordHash] = React.useState(""); 
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState(null); 
  const [showPassword, setShowPassword] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [passwordHashTheme, setPasswordHashTheme] = React.useState(theme);
  const [emailTheme, setEmailTheme] = React.useState(theme);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setName("");
    setLastName("");
    setIdentification("")
    setPasswordHash("");
    setEmail("");
    setDepartament("");
    setMunicipality("");
    setNomenclature("");
    setOpen(false);
  }

  const handleEmpty = () => {
    if(name === "" || lastName === "" || identification === "" || departament === "" || municipality === "" || nomenclature === "" || email === "" || passwordHash === ""){
      if(name === ""){
        setNameTheme(themeRed);
      }if(lastName === ""){
        setLastNameTheme(themeRed);
      }if(identification === ""){
        setIdentificationTheme(themeRed);
      }if(departament === ""){
        setDepartamentTheme(themeRed);
      }if(municipality === ""){
        setMunicipalityTheme(themeRed);
      }if(nomenclature === ""){
        setNomenclatureTheme(themeRed);
      }if(email === ""){
        setEmailTheme(themeRed);
      }if(passwordHash === ""){
        setPasswordHashTheme(themeRed);
      }
      return false;
    }else{
      return true;
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json');
        const data = await response.json();
        const departaments = data.map(item => item.departamento);
        const departamentsUniques = [...new Set(departaments)];
        setDepartaments(departamentsUniques);
        setData(data);
      } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    if (Array.isArray(data)) {
      const municipalitys = data
        .filter(item => item.departamento === departament)
        .map(item => item.municipio);
      
      setMunicipalitys(municipalitys);
    }  
  }, [data, departament]);

  const handleNameTheme = (value) => {
    value !== "" ? setNameTheme(theme) : setNameTheme(themeRed);
  }

  const handleLastNameTheme = (value) => {
    value !== "" ? setLastNameTheme(theme) : setLastNameTheme(themeRed);
  }

  const handleIdentificationTheme = (value) => {
    value !== "" ? setIdentificationTheme(theme) : setIdentificationTheme(themeRed);
  }

  const handleChangeDepartament = (event) => {
    setDepartament(event.target.value);
    event.target.value !== "" ? setDepartamentTheme(theme) : setDepartamentTheme(themeRed);
  };

  const handleChangeMunicipality = (event) => {
    setMunicipality(event.target.value);
    event.target.value !== "" ? setMunicipalityTheme(theme) : setMunicipalityTheme(themeRed);
  };

  const handleNomenclature = (value) => {
    setNomenclature(value);
    value !== "" ? setNomenclatureTheme(theme) : setNomenclatureTheme(themeRed);
  }

  const handleEmail = (value) => {
    setEmail(value);
    value !== "" ? setEmailTheme(theme) : setEmailTheme(themeRed);
  }

  const handlePassword = (value) => {
    setPasswordHash(value);
    value !== "" ? setPasswordHashTheme(theme) : setPasswordHashTheme(themeRed);
  }

  const handleCreate = async () => {
    try {
      if (handleEmpty()) {
        const data = {
          name,
          lastName,
          identification,
          passwordHash,
          email,
          department: departament,
          municipality,
          nomenclature,
        };
        const response = await userController.newUser(data, image);
        response.status === 201
          ? alert("Creación exitosa")
          : alert("Error al crear el usuario");
      }else{
        alert('Por favor, rellene todos los campos antes de continuar.');
      }
      } catch (error) {
        console.error(error);
        alert("Ocurrió un error al intentar crear el usuario");
    }
};

  return (
    <div className='div-top-table'>
      <div>
        <h4>Conductores</h4>
      </div>
      <div >
        <Button onClick={handleOpen} sx={{ color: 'black', mr: '10px', marginBottom: '0'}}>Crear conductor</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='text-login'>
              <h2>Nuevo usuario</h2>
            </div>
            <div className='div-create-truck'>
              <div className='div-create-truck-left'>
              <div>
                <ThemeProvider theme={nameTheme}>
                  <TextField sx={{ width: '370px' }}  id="outlined-basic" label="Nombre" variant="outlined" value={name} onChange={(e) => {setName(e.target.value); handleNameTheme(e.target.value)}}/>
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
              <div>
                <ThemeProvider theme={departamentTheme}>
                    <FormControl sx={{ width: '370px', marginTop: '35px' }}  variant="outlined">
                        <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={departament}
                            label="Departamento"
                            onChange={handleChangeDepartament}
                        >
                            {departaments && departaments.map((departament) => (
                            <MenuItem key={departament} value={departament}>{departament}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={municipalityTheme}>
                    <FormControl sx={{ width: '370px', marginTop: '35px' }}  variant="outlined">
                        <InputLabel id="demo-simple-select-label">Municipio</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={municipality}
                            label="Municipio"
                            onChange={handleChangeMunicipality}
                        >
                            {municipalitys && municipalitys.map((municipality) => (
                            <MenuItem key={municipality} value={municipality}>{municipality}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={nomenclatureTheme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="outlined-basic" label="Direccion" variant="outlined" value={nomenclature} onChange={(e) => handleNomenclature(e.target.value)}/>
                </ThemeProvider>
              </div>
              </div>
              <div className='div-create-truck-rigth'>
              <div>
                <ThemeProvider theme={emailTheme}>
                  <TextField sx={{ width: '370px'}} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => handleEmail(e.target.value.toLowerCase())}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={passwordHashTheme}>
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
                        onChange={(e) => handlePassword(e.target.value)}
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
              </div>
            </div>
            <div className="button-create-truck">
              <Button
                variant="contained"
                disableElevation
                onClick={handleCreate}
              >
                Crear usuario
              </Button>
              {uploadSuccess && <p>La foto se ha cargado exitosamente.</p>}
            </div>
          </Box>
        </Modal>
      </div>
    </div>
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

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

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