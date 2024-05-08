import React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { User } from '../request/users';

const userController = new User();

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

export default function TableUsers() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userController.getListUser();
        setUsers(data);
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
      users,
    );

    setUsers(newRows);
    setLoading(false);
  };

  const data = {
    columns: [
      { field: 'name', headerName: 'Nombre', flex: 1 },
      { field: 'lastName', headerName: 'Apellido', flex: 1 },
      { field: 'identification', headerName: 'Identificacion', flex: 1 },
      { field: 'municipality', headerName: 'Ciudad', flex: 1 },
    ],
    rows: users,
  };  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '72vh', width: '100%' }}>
      <div style={{ height: '100%', width: '95%' }}>
        <DataGridPro
          {...data}
          loading={loading}
          rows={users}
          rowReordering
          onRowOrderChange={handleRowOrderChange}
        />
      </div>
    </div>
  );  
}
