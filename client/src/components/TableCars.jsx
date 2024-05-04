import React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Truck } from '../request/trucks';

const truckController = new Truck();

function updateRowPosition(initialIndex, newIndex, rows) {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const rowsClone = [...rows];
        const row = rowsClone.splice(initialIndex, 1)[0];
        rowsClone.splice(newIndex, 0, row);
        resolve(rowsClone);
      },
      Math.random() * 500 + 100,
    ); 
  });
}

export default function Tablecars() {
  const [trucks, setTrucks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await truckController.getListTrucks();
        const data = await response.json();
        setTrucks(data);
      } catch (error) {
        console.error('Hubo un error al cargar los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleRowOrderChange = async (params) => {
    setLoading(true);
    const newRows = await updateRowPosition(
      params.oldIndex,
      params.targetIndex,
      trucks,
    );

    setTrucks(newRows);
    setLoading(false);
  };

  const data = {
    columns: [
      { field: 'licensePlate', headerName: 'Placa', flex: 1 },
      { field: 'brand', headerName: 'Marca', flex: 1 },
      { field: 'model', headerName: 'Linea', flex: 1 },
      { field: 'year', headerName: 'Modelo', flex: 1 },
      { field: 'actualStatus', headerName: 'Estado actual', flex: 1 },
      { field: 'mileage', headerName: 'Kilometraje', flex: 1 },
      { field: 'placa', headerName: 'M. Preventivo', flex: 1 },
      { field: 'name', headerName: 'Legales', flex: 1 },
    ],
    rows: trucks,
  };  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', width: '100%' }}>
      <div style={{ height: '100%', width: '95%' }}>
        <DataGridPro
          {...data}
          loading={loading}
          rows={trucks}
          rowReordering
          onRowOrderChange={handleRowOrderChange}
        />
      </div>
    </div>
  );  
}
