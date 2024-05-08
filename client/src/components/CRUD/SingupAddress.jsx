import * as React from 'react';
import { User } from '../../request/users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const userController = new User();

export const SingupAddress = () => {
  const [departament, setDepartament] = React.useState("");
  const [municipality, setMunicipality] = React.useState("");
  const [nomenclature, setNomenclature] = React.useState("");
  const [departaments, setDepartaments] = React.useState("");
  const [municipalitys, setMunicipalitys] = React.useState("");
  const [data, setData] = React.useState("");
  const [departamentTheme, setDepartamentTheme] = React.useState(theme);
  const [municipalityTheme, setMunicipalityTheme] = React.useState(theme);
  const [nomenclatureTheme, setNomenclatureTheme] = React.useState(theme);

  const navigate = useNavigate();

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

  const handleCreate = async () => {
    if (handleEmpty()) {
      const address = {
        departament,
        municipality,
        nomenclature,
      }
      userController.createCookie("address", JSON.stringify(address)); 
      navigate('/singup-data-log');
    } else {      
      alert('Por favor, rellene todos los campos antes de continuar.');
    }
  };

  const handleChangeDepartament = (event) => {
    setDepartament(event.target.value);
    event.target.value != "" ? setDepartamentTheme(theme) : setDepartamentTheme(themeRed);
  };

  const handleChangeMunicipality = (event) => {
    setMunicipality(event.target.value);
    event.target.value != "" ? setMunicipalityTheme(theme) : setMunicipalityTheme(themeRed);
  };

  React.useEffect(() => {
    if (Array.isArray(data)) {
      const municipalitys = data
        .filter(item => item.departamento === departament)
        .map(item => item.municipio);
      
      setMunicipalitys(municipalitys);
    }  
  }, [departament]);

  const handleEmpty = () => {
    if(departament === "" || municipality === "" || nomenclature === ""){
      if(departament === ""){
        setDepartamentTheme(themeRed);
      }if(municipality === ""){
        setMunicipalityTheme(themeRed);
      }if(nomenclature === ""){
        setNomenclatureTheme(themeRed);
      }
      return false;
    }else{
      return true;
    }
  }

  const handleNomenclature = (value) => {
    setNomenclature(value);
    value != "" ? setNomenclatureTheme(theme) : setNomenclatureTheme(themeRed);
  }
  
  return (
      <>
        <div className='div-login'>
          <div className='div-login-left'>
          </div>
          <div className='div-login-right'>
            <div className='div-login-info'>
              <div className='text-login'>
                <h2>Nuevo usuario</h2>
                <h4>Direccion</h4>
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
              <div className="button-singup">
                <Button 
                  variant="contained" 
                  disableElevation
                  onClick={handleCreate}
                  style={{ backgroundColor: '#000000', width: '270px',height: '40px', borderRadius: '15px', marginTop:'40px', borderBottom:'0' }}
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