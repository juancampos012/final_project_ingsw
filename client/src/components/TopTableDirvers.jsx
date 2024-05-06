import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export const TopTableDrivers = () => {
    const navigate = useNavigate();
  const handleCreate = () => {
    navigate('/signup-personal-data');
  };

  return (
    <div className='div-top-table'>
      <div>
        <h4>Conductores</h4>
      </div>
      <div >
        <Button onClick={handleCreate} sx={{ color: 'black', mr: '10px', marginBottom: '0'}}>Crear conductor</Button>
      </div>
    </div>
  );
}