import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete as MaterialAutocomplete } from '@mui/material';
import { Truck } from '../request/trucks';
import { Tire } from '../request/tires';
import { Modal as AntdModal } from 'antd';
import { Modal as MuiModal } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addTire } from '../slices/tireSlice';
import { useDispatch } from 'react-redux';

const truckController = new Truck();
const tireController = new Tire();

export const Tires = () => {
  const [open, setOpen] = React.useState(false);
  const [hoveredWheel, setHoveredWheel] = useState(null);
  const [brandTruck, setBrandTruck] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [wear, setWear] = React.useState("");
  const [mileage, setMileage] = React.useState("");
  const [model, setModel] = React.useState("");
  const [velocityIndex, setVelocityIndex] = React.useState("");
  const [wetGrip, setWetGrip] = React.useState("");
  const [licensePlates, setLicensePlates] = React.useState("");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [truckId, setTruckId] = React.useState("");


  const dispatch = useDispatch();

  const positionLabels = {
    1: 'Delantera izquierda',
    2: 'Delantera derecha',
    3: 'Trasera izquierda',
    4: 'Trasera derecha',
    5: 'Central izquierda',
    6: 'Central derecha'
  };

  const handleOpen = () =>{
    if(truckId){
      setOpen(true);
    }else{
      AntdModal.error({
        content: 'Seleccione un camion.',
      });
    }
  }
  const handleClose = () =>{
    setOpen(false);
    setBrand("");
    setMileage("");
    setWear("");
    setVelocityIndex()
    setWetGrip("")
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await truckController.getListLicensePlates();
        setLicensePlates(response);
      } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      if (licensePlate) {
        try {
          const response = await truckController.getTruckByLicencePlate(licensePlate);
          setBrandTruck(response.brand);
          setModel(response.model);
          setTruckId(response.id);
        } catch (error) {
          console.error('Hubo un error al obtener los datos del usuario:', error);
        }
      }
    };
    fetchData();
  }, [licensePlate]); 

  const handleChangeLicensePlate = (event, newValue) => {
    setLicensePlate(newValue);
  };

  const Wheel = ({ onClick, isHovered, wheelNumber }) => {

    const handleClick = async () => {
      onClick();
    };

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            width: '40px',
            height: '70px',
            borderRadius: '7px',
            backgroundColor: isHovered ? 'rgb(54, 54, 54)' : 'black',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setHoveredWheel(wheelNumber)}
          onMouseLeave={() => setHoveredWheel(null)}
          onClick={handleClick}
        />
      </div>
    );
  };

  const Circle = () => (
    <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'grey' }} />
  );

  const Stick = () => (
    <div style={{ width: '180px', height: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );

  const VerticalStick = () => (
    <div style={{ height: '100px', width: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );

  const VerticalStickLarge = () => (
    <div style={{ height: '200px', width: '10px', backgroundColor: 'grey', alignSelf: 'center' }} />
  );

  const handleCreate = async () => {
    const mileageInt = parseInt(mileage);
    const wearInt = parseInt(wear);
    const velocityIndexInt = parseInt(velocityIndex);

    try {

      if (!brand || !hoveredWheel || !truckId || isNaN(wearInt) || isNaN(mileageInt)) {
        AntdModal.error({
            content: 'Todos los campos son obligatorios y deben tener valores válidos.',
        });
        return;
    }

    if (wearInt < 0 || wearInt > 100) {
        AntdModal.error({
            content: 'El desgaste debe estar entre 0 y 100.',
        });
        return;
    }

    if (mileageInt < 0) {
        AntdModal.error({
            content: 'El kilometraje debe ser mayor a cero.',
        });
        return;
    }

    if (velocityIndexInt < 0) {
      AntdModal.error({
          content: 'La velocidad debe ser mayor a cero.',
      });
      return;
  }


      const data = {
        brand,
        position: hoveredWheel,
        truckId, 
        wear: wearInt,
        mileage: mileageInt,
        velocityIndex: velocityIndexInt,
        wetGrip,
      };

      const response = await tireController.newTire(data);

      if (response.status === 400) {
        AntdModal.confirm({
          title: 'Llanta existente',
          content: "Deseas reemplazarla?",
          onOk: async () => {
            const tire = await tireController.getTireByTruckId(truckId, hoveredWheel);
            const dataTire = {
              id: tire.id,
              brand,
              position: hoveredWheel,
              truckId, 
              wear: wearInt,
              mileage: mileageInt,
              velocityIndex: velocityIndexInt,
              wetGrip,
            };
            const replaceResponse = await tireController.updateTireById(dataTire);
            if (replaceResponse.status === 201) {
              setOpen(false);
              AntdModal.success({
                content: 'Llanta reemplazada exitosamente.',
            });
            return;
            } else {         
              setOpen(false);     
              AntdModal.error({
                content: 'Error al reemplazar llanta.',
            });
            return;
            }
          },
        });
      }else {
        setOpen(false);
        AntdModal.success({
          content: 'Llanta creada exitosamente.',
         });
         setOpen(false);
      }
    } catch (error) {
      AntdModal.error({
        content: 'Error al crear llanta.',
      });
    }
  };

  return (
    <>
    
      <div className='div-top-tires'>
        <h3>Llantas</h3>
        <div>
        <ThemeProvider theme={theme}>
                  <FormControl sx={{ width: '370px', marginBottom: '40px' }} variant="outlined">
                      <MaterialAutocomplete
                          id="combo-box-demo"
                          options={licensePlates}
                          getOptionLabel={(option) => option.licensePlate}
                          style={{ width: 370 }}
                          renderInput={(params) => <TextField {...params} label="Placa" variant="outlined" />}
                          onInputChange={handleChangeLicensePlate}
                      />
                  </FormControl>
              </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Marca" variant="outlined" value={brandTruck} />
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Modelo" variant="outlined" value={model} />
                </ThemeProvider>
              </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' , marginBottom: '200px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '-55px' }}>
          <Circle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px' }}>
          <Wheel onClick={handleOpen} isHovered={hoveredWheel === 1} wheelNumber={1} />
          <Stick />
          <Wheel onClick={handleOpen} isHovered={hoveredWheel === 2} wheelNumber={2} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '-40px' }}>
          <VerticalStickLarge />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-3px', marginBottom: '-23px' }}>
          <Circle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px', marginTop: '-30px' }}>
          <Wheel onClick={handleOpen} isHovered={hoveredWheel === 3} wheelNumber={3} />
          <Stick />
          <Wheel onClick={handleOpen} isHovered={hoveredWheel === 4} wheelNumber={4} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '-40px' }}>
          <VerticalStick />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-3px', marginBottom: '-23px' }}>
          <Circle />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '200px', marginTop: '-30px' }}>
          <Wheel onClick={handleOpen} isHovered={hoveredWheel === 5} wheelNumber={5} />
          <Stick />
          <Wheel onClick={handleOpen} isHovered={hoveredWheel === 6} wheelNumber={6} />
        </div>
        <div >
        <MuiModal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='text-login'>
              <h2>Nueva llanta</h2>
            </div>
            <div className='div-create-truck'>
            <div className='div-create-truck-rigth'>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Posición" variant="outlined" value={positionLabels[hoveredWheel]} />
                </ThemeProvider>
              </div>
              <div>
              <ThemeProvider theme={theme}>
  <FormControl sx={{ width: '370px', marginBottom: '40px' }} variant="outlined">
    <MaterialAutocomplete
      id="combo-box-demo"
      options={["Michellin", "Pirelli", "Bribgeston"]} 
      getOptionLabel={(option) => option}
      style={{ width: 370 }}
      renderInput={(params) => <TextField {...params} label="Marca llanta" variant="outlined" />}
      onInputChange={(event, newValue) => setBrand(newValue)}
    />
  </FormControl>
</ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Velocidad maxima(km)" variant="outlined" value={velocityIndex} onChange={(e) => setVelocityIndex(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Argarre mojado(A-F)" variant="outlined" value={wetGrip} onChange={(e) => setWetGrip(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Desgaste (%)" variant="outlined" value={wear} onChange={(e) => setWear(e.target.value)}/>
                </ThemeProvider>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <TextField sx={{ width: '370px', marginBottom: '40px' }} id="outlined-basic" label="Kilometraje" variant="outlined" value={mileage} onChange={(e) => setMileage(e.target.value)}/>
                </ThemeProvider>
              </div>
            </div>
            </div>
            <div className="button-create-tire">
              <Button
                variant="contained"
                disableElevation
                onClick={handleCreate}
              >
                Crear
              </Button>
            </div>
          </Box>
          </MuiModal>
      </div>
      </div>
    </>
  );
};

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
  height: '90vh'
};