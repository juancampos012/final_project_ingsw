import React from 'react';
import { useDispatch } from "react-redux";
import { addUser, getUsers } from "../slices/userSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { User } from '../request/users';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Modal as AntdModal } from 'antd';
import { Modal as MuiModal } from '@mui/material';
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
import { useDispatch } from 'react-redux';
import { addUser } from '../slices/userSlice';

const userController = new User();

export const TopTableDrivers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [departaments, setDepartaments] = React.useState([]);
  const [municipalitys, setMunicipalitys] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
    identification: "",
    password: "",
    email: "",
    isActive: false,
    avatar: "",
    role: "",
    department: "",
    municipality: "",
    nomenclature: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleAvatarChange = (event) => {
    setFormData({ ...formData, avatar: event.target.files[0] });
  };

  const handleChangeRole = (event) => {
    setFormData({ ...formData, role: event.target.value });
  };

  const handleChangeDepartament = (event) => {
    const selectedDepartament = event.target.value;
    setFormData({ ...formData, department: selectedDepartament });
  
    const municipalitys = data
      .filter(item => item.departamento === selectedDepartament)
      .map(item => item.municipio);
    
    setMunicipalitys(municipalitys);
  };
  
  const handleChangeMunicipality = (event) => {
    setFormData({ ...formData, municipality: event.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (Array.isArray(data)) {
      const municipalitys = data
        .filter(item => item.departamento === formData.department)
        .map(item => item.municipio);
      
      setMunicipalitys(municipalitys);
    }  
  }, [data, formData.department]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name); 
      formDataToSend.append("lastName", formData.lastName); 
      formDataToSend.append("identification", formData.identification); 
      formDataToSend.append("avatar", formData.avatar);
      formDataToSend.append("password", formData.password); 
      formDataToSend.append("email", formData.email); 
      formDataToSend.append("role", formData.role); 
      formDataToSend.append("department", formData.department); 
      formDataToSend.append("municipality", formData.municipality); 
      formDataToSend.append("nomenclature", formData.nomenclature); 

      console.log(formDataToSend)

      const response = await userController.newUser(formDataToSend);
      dispatch(addUser(formData));
      if(response.status == 201){
        AntdModal.success({
          content: 'Usuario creado correctamente.',
        });
      }else{
        AntdModal.error({
          content: 'Ocurrio un error al crear el usuario.',
        });
      }

      const usersData = await userController.getListUser();
      dispatch(getUsers(usersData));

      setFormData({
        name: "",
        lastName: "",
        identification: "",
        password: "",
        email: "",
        isActive: false,
        avatar: "",
        role: "",
        department: "",
        municipality: "",
        nomenclature: "",
      });
      setOpen(false); 
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div className='div-top-table'>
      <div>
        <h4>Conductores</h4>
      </div>
      <div >
        <Button onClick={handleOpen} sx={{ color: 'black', mr: '10px', marginBottom: '0'}}>Crear conductor</Button>
        <MuiModal
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
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px' }} id="name" label="Nombre" variant="outlined" value={formData.name} onChange={handleChange} />
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="lastName" label="Apellido" variant="outlined" value={formData.lastName} onChange={handleChange}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="identification" label="Identificacion" variant="outlined" value={formData.identification} onChange={handleChange}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <FormControl sx={{ width: '370px', marginTop: '35px' }}  variant="outlined">
                    <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="department"
                      value={formData.department}
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
                <ThemeProvider theme={theme}>
                  <FormControl sx={{ width: '370px', marginTop: '35px' }}  variant="outlined">
                    <InputLabel id="demo-simple-select-label">Municipio</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="municipality"
                      value={formData.municipality}
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
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px' }} id="nomenclature" label="Direccion" variant="outlined" value={formData.nomenclature} onChange={handleChange}/>
                </ThemeProvider>
              </div>
              </div>
              <div className='div-create-truck-rigth'>
              <div>
                <ThemeProvider theme={theme}>
                    <FormControl sx={{ width: '370px' }}  variant="outlined">
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="role"
                            value={formData.role}
                            label="Role"
                            onChange={handleChangeRole}
                        >
                          <MenuItem key={"user"} value={"user"}>User</MenuItem>
                          <MenuItem key={"admin"} value={"admin"}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginTop: '35px'}} id="email" label="Email" variant="outlined" value={formData.email} onChange={handleChange}/>
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
                        value={formData.password}
                        onChange={handleChange}
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
                  style={{ backgroundColor: '#000000', borderRadius: '50px', marginTop:'35px'}}
                >
                  Cargar foto
                  <VisuallyHiddenInput id="avatar" type="file" accept='image/*' onChange={handleAvatarChange}/>
                </Button>
              </div>
              </div>
            </div>
            <div className="button-create-truck">
              <Button
                variant="contained"
                disableElevation
                onClick={handleCreateUser}
              >
                Crear usuario
              </Button>
            </div>
          </Box>
        </MuiModal>
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